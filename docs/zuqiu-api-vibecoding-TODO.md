# zuqiu-api 清单 · VibeCoding 鉴赏（给 zuqiu 项目用）

> **请在 `zuqiu/server` 仓库完成以下全部工作。**  
> **不要在 RuleHub 仓库改接口/同步/数据库逻辑。**  
> RuleHub 只负责页面展示，通过 HTTP 调用你提供的 API。

**状态：本地代码已全部完成（2026-07-08），待服务器 `git pull` + 迁移 + 重新 sync 验收。**

---

## 一、项目分工（必读）

| 项目 | 仓库 | 域名 | 端口 | 做什么 |
|------|------|------|------|--------|
| **zuqiu-api** | `xiaoyang188/zuqiunService` → `server/` | `api.yimingyinglou.top` | 3000 | 抓 HN、翻译、存 MySQL、提供 REST |
| **RuleHub** | `xiaoyang188/ruleHub` | `www.yimingyinglou.top` | 3001 | 页面 `/vibecoding`，代理读你的 API |

RuleHub 期望的数据源：

```
https://api.yimingyinglou.top/api/vibecoding/items
```

环境变量（RuleHub 侧，可选）：

```env
ZUQIU_API_BASE=https://api.yimingyinglou.top
```

---

## 二、已完成（zuqiu-api 本地）

### 基础接入

- [x] 基础表 `vibecoding_items` / `vibecoding_sync_logs`
- [x] `GET /api/vibecoding/items`
- [x] `GET /api/vibecoding/items/:id`
- [x] `POST /api/vibecoding/sync`
- [x] HN Show HN 同步（前 40 条，关键词过滤）
- [x] `index.js` 注册 `vibecodingRoutes`
- [x] `scheduler.js` 定时同步（`VIBECODING_SYNC_MS`，默认 30 分钟）
- [x] `npm run db:migrate:vibecoding`

### 图片 + 中文翻译（v1.1）

- [x] 增量迁移 `title_zh` / `summary_zh`（`migration-vibecoding-i18n.sql`）
- [x] `npm run db:migrate:vibecoding-i18n`
- [x] `src/utils/vibecodingMeta.js`（`decodeHtml` / `resolveImageUrl` / `translateToZh`）
- [x] 同步时写入 `image_url`（GitHub 头像 / DuckDuckGo favicon）
- [x] 同步时英译中写入 `title_zh` / `summary_zh`（Google Translate，`VIBECODING_TRANSLATE` 可关）
- [x] `vibecodingRepo.js` — `mapRow` 优先返回中文，`titleEn`/`titleZh` 等字段齐全
- [x] `vibecodingSync.js` — 完整流程含翻译间隔 120ms

---

## 三、文件清单（zuqiu/server）

```
server/
├── sql/
│   ├── migration-vibecoding.sql          ✅
│   └── migration-vibecoding-i18n.sql     ✅
├── src/
│   ├── index.js                          ✅ 已注册 vibecodingRoutes
│   ├── utils/
│   │   └── vibecodingMeta.js             ✅
│   ├── repositories/
│   │   └── vibecodingRepo.js             ✅ mapRow + upsert i18n
│   ├── routes/
│   │   └── vibecodingRoutes.js           ✅
│   ├── sync/
│   │   ├── scheduler.js                  ✅ vibecoding 定时任务
│   │   └── vibecodingSync.js             ✅ 翻译 + imageUrl
│   └── scripts/
│       ├── migrate-vibecoding.js           ✅
│       └── migrate-vibecoding-i18n.js      ✅
├── package.json                          ✅ db:migrate:vibecoding + db:migrate:vibecoding-i18n
└── .env.example                          ✅ VIBECODING_SYNC_MS / VIBECODING_TRANSLATE
```

---

## 四、API 契约（RuleHub 已按此对接，请勿随意改字段名）

### 列表

```
GET /api/vibecoding/items?type=project&source=hn&page=1&limit=20&sort=score
```

| 参数 | 说明 |
|------|------|
| `sort=score` | 按热度 |
| `sort=recent` | 按时间 |

**响应 `items[]` 字段（camelCase）：**

```javascript
{
  id, type, source, externalId,
  title,        // 展示用，优先中文
  titleEn, titleZh,
  summary,      // 展示用，优先中文
  summaryEn, summaryZh,
  url, imageUrl, author, score, commentCount, tags,
  publishedAt, syncedAt, isFeatured
}
```

### 手动同步

```
POST /api/vibecoding/sync
```

**响应：**

```json
{ "code": 0, "data": { "ok": true, "count": 30 }, "message": "ok" }
```

> 改完翻译/图片后**必须重新 sync 一次**，旧数据不会自动补全。

---

## 五、部署命令（zuqiu 服务器）

```bash
cd /www/wwwroot/zuqiu/server

git pull

npm run db:migrate:vibecoding        # 首次
npm run db:migrate:vibecoding-i18n # 增量 i18n 列

pm2 restart zuqiu-api

# 重新同步（含翻译 + 图标，约 1～2 分钟）
curl -X POST https://api.yimingyinglou.top/api/vibecoding/sync

# zuqiu-api 直验
curl "https://api.yimingyinglou.top/api/vibecoding/items?page=1&limit=2"
```

**zuqiu-api 验收标准：**

- [ ] `imageUrl` 非空（GitHub 头像或 DuckDuckGo ico）
- [ ] `title` / `summary` 为中文（或 `titleZh` 有值）
- [ ] `score`、`commentCount` 正常

---

## 六、RuleHub 验收（一条命令）

RuleHub BFF 代理 zuqiu-api，**用此命令验收前端数据源**：

```bash
curl -s "https://www.yimingyinglou.top/api/vibecoding/items?page=1&limit=5&sort=score" | jq '{code, total: .data.total, count: (.data.items | length), first: {title: .data.items[0].title, imageUrl: .data.items[0].imageUrl}}'
```

**通过：** `code` 为 `0`，`count` > 0，`first.title` 为中文，`first.imageUrl` 非空。

**失败排查：**

1. zuqiu-api 是否已 `POST /api/vibecoding/sync`
2. RuleHub 是否 `git pull && npm run build && pm2 restart rulehub`
3. 服务器能否访问 `translate.googleapis.com`（翻译失败时 `titleZh` 可能为空，但 `imageUrl` 仍应有值）

---

## 七、RuleHub 侧（你不需要在 zuqiu 项目里做）

RuleHub 已完成：

- 页面：`/vibecoding`
- 导航：「VibeCoding」
- BFF：`GET /api/vibecoding/items` → 转发 zuqiu-api

**RuleHub 只改 UI，不再改 zuqiu 接口实现。**

zuqiu 部署完成后，RuleHub 服务器：

```bash
cd /www/wwwroot/www.yimingyinglou.top
git pull && npm run build && pm2 restart rulehub
```

---

## 八、AI 最新消息（type=news）— RuleHub 已接页面，zuqiu 待同步

> **完整专篇文档：** [`zuqiu-api-vibecoding-news-TODO.md`](./zuqiu-api-vibecoding-news-TODO.md)  
> 含 API 契约、HN 同步流程、过滤规则、验收命令与伪代码。

RuleHub 新增 **`/vibecoding/news`**，请求：

```
GET /api/vibecoding/items?type=news&source=hn&page=1&limit=12&sort=recent
```

**不需要新 REST 接口**，只需 zuqiu-api 增加 HN `topstories` 同步并写入 `type=news`。

当前线上 `type=news` 若摘要为空，见 **`zuqiu-api-vibecoding-content-TODO.md`**（同步抓全文 `content` 字段）。

**快速验收：**

```bash
curl "https://api.yimingyinglou.top/api/vibecoding/items?type=news&page=1&limit=3&sort=recent"
# items 非空，type 均为 news
```

---

## 九、后续扩展（可选，v3）

| 功能 | zuqiu-api 侧 |
|------|----------------|
| GitHub Trending | 新 source=`github`，定时爬 trending |
| 手动精选 | `POST /api/vibecoding/items`，source=`manual` |
| OG 大图 | 同步时抓 `og:image` 写入 `image_url` |
| 翻译换 DeepL | 改 `translateToZh` 实现，字段不变 |
| sync 鉴权 | `POST /api/vibecoding/sync` 加 `SYNC_SECRET` |

---

## 十、参考实现位置

本地完整实现：

```
d:\Desktop\zuqiu\server\src\utils\vibecodingMeta.js
d:\Desktop\zuqiu\server\src\repositories\vibecodingRepo.js
d:\Desktop\zuqiu\server\src\sync\vibecodingSync.js
d:\Desktop\zuqiu\server\sql\migration-vibecoding-i18n.sql
d:\Desktop\zuqiu\server\docs\VIBECODING_BACKEND.md
```

推送到 `xiaoyang188/zuqiunService` 后在服务器 `git pull` 即可。

---

*文档版本：2026-07-08 · v1.1 i18n + imageUrl 已完成，待生产部署验收*
