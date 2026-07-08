# zuqiu-api 待办 · AI 最新消息（type=news）

> **请在 `zuqiu/server` 仓库完成以下工作。**  
> **RuleHub 不再改接口实现**，只消费你提供的 API。  
> 本文档专门描述 RuleHub 新页面 **`/vibecoding/news`**（AI 最新消息）对后端的需求。

**状态：RuleHub 前端已完成（2026-07-08），zuqiu-api 新闻同步待实现。**

---

## 一、要不要新接口？

**不需要新增 REST 路由。** 复用现有 VibeCoding 接口即可：

| 接口 | 是否新建 | 说明 |
|------|----------|------|
| `GET /api/vibecoding/items` | ❌ 已有 | 加查询参数 `type=news` |
| `GET /api/vibecoding/items/:id` | ❌ 已有 | 新闻详情（可选） |
| `POST /api/vibecoding/sync` | ❌ 已有 | **扩展**：同步时额外抓取 HN 新闻 |
| 数据库新表 | ❌ 不需要 | `vibecoding_items.type` 已支持 `news` |

RuleHub 与 zuqiu-api 的调用关系：

```
Hacker News topstories / newstories
        ↓ zuqiu-api 定时同步（新增逻辑）
MySQL vibecoding_items  (type = 'news')
        ↓ HTTP
RuleHub  /api/vibecoding/items?type=news  →  代理  →  zuqiu-api
        ↓
用户浏览器  /vibecoding/news
```

---

## 二、RuleHub 实际发起的请求

### 2.1 列表（BFF 代理 zuqiu-api）

RuleHub 页面 `/vibecoding/news` 会请求：

```
GET https://www.yimingyinglou.top/api/vibecoding/items
```

等价转发到 zuqiu-api：

```
GET https://api.yimingyinglou.top/api/vibecoding/items?type=news&source=hn&page=1&limit=12&sort=recent
```

| 参数 | RuleHub 传值 | 说明 |
|------|----------------|------|
| `type` | **`news`** | 必填，与 `project` 区分 |
| `source` | `hn` | 当前仅 Hacker News |
| `page` | `1, 2, 3…` | 无限滚动分页 |
| `limit` | `12` | 每页条数 |
| `sort` | **`recent`** | 新闻页默认按最新；也支持 `score` |

### 2.2 与「项目鉴赏」的区别

| 页面 | RuleHub 路由 | `type` | 默认 `sort` |
|------|--------------|--------|-------------|
| 项目鉴赏 | `/vibecoding` | `project` | `score` |
| AI 最新消息 | `/vibecoding/news` | `news` | `recent` |

**同一套 API、同一套响应字段**，仅 `type` 与默认排序不同。

---

## 三、API 响应契约（与 project 完全一致）

### 3.1 成功响应

```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "items": [
      {
        "id": 101,
        "type": "news",
        "source": "hn",
        "externalId": "39201234",
        "title": "OpenAI 发布新模型…",
        "titleEn": "OpenAI releases new model…",
        "titleZh": "OpenAI 发布新模型…",
        "summary": "摘要中文…",
        "summaryEn": "Summary in English…",
        "summaryZh": "摘要中文…",
        "url": "https://example.com/article",
        "imageUrl": "https://icons.duckduckgo.com/ip3/example.com.ico",
        "author": "hnuser",
        "score": 842,
        "commentCount": 156,
        "tags": ["hn-top", "ai-news"],
        "publishedAt": "2026-07-08T08:00:00.000Z",
        "syncedAt": "2026-07-08T09:00:00.000Z",
        "isFeatured": false
      }
    ],
    "total": 45,
    "page": 1,
    "limit": 12,
    "hasNext": true
  }
}
```

### 3.2 字段要求

| 字段 | 要求 |
|------|------|
| `type` | 必须为 **`news`** |
| `title` / `summary` | 展示用，**优先中文**（与 project 相同 mapRow 逻辑） |
| `titleZh` / `summaryZh` | 同步时翻译写入，可为空但建议有值 |
| `imageUrl` | **非空**（DuckDuckGo favicon 或 GitHub 头像） |
| `publishedAt` | ISO 8601 |
| 命名 | JSON **camelCase**，勿改字段名 |

### 3.3 列表查询（repository 层）

`vibecodingRepo.listItems()` 在收到 `type=news` 时：

```sql
WHERE status = 'active' AND type = 'news'
-- 可选 AND source = 'hn'
ORDER BY published_at DESC   -- sort=recent
-- 或 ORDER BY score DESC    -- sort=score
```

若现有 list 已支持 `type` 过滤，**无需改路由**，只需库里有 `type=news` 的数据。

---

## 四、zuqiu-api 待实现：HN 新闻同步

### 4.1 数据源（Hacker News 官方 API，免费无 Key）

| 用途 | URL |
|------|-----|
| 首页热榜 ID 列表 | `GET https://hacker-news.firebaseio.com/v0/topstories.json` |
| 最新帖 ID 列表（可选合并） | `GET https://hacker-news.firebaseio.com/v0/newstories.json` |
| 单条详情 | `GET https://hacker-news.firebaseio.com/v0/item/{id}.json` |

建议：**topstories 前 60 条 + newstories 前 40 条**，去重后逐条拉详情。

### 4.2 同步流程

```
1. 拉 topstories.json → ids[]
2. （可选）拉 newstories.json → 合并去重
3. 取前 N 条 id（建议合计不超过 80）
4. 对每个 id：
   a. GET item/{id}.json
   b. 校验 + 过滤（见 4.3）
   c. decodeHtml(title)、stripHtml(text) 作 summary
   d. imageUrl = resolveImageUrl(url, author)
   e. titleZh / summaryZh = translateToZh(...)  // 复用 vibecodingMeta.js
   f. UPSERT vibecoding_items（type='news', source='hn', external_id=id）
   g. sleep(120ms) × 2  // 翻译限流
5. 写 vibecoding_sync_logs（source='hn-news' 或 'hn'）
```

### 4.3 过滤规则

**跳过：**

- `deleted === true` 或 `dead === true`
- 无 `title`
- 标题以 **`Show HN:`** 开头（属于项目帖，由 `type=project` 同步负责）
- 标题 + 正文均不匹配 AI 关键词

**保留（标题或 summary 匹配任一关键词，不区分大小写）：**

```
ai, artificial intelligence, llm, gpt, claude, anthropic, openai,
agent, copilot, cursor, gemini, deepseek, mistral, meta, nvidia,
machine learning, ml, benchmark, model, inference, fine-tune,
regulation, chip, cuda, transformer, diffusion, vlm, multimodal
```

可与 project 共用关键词函数，news 可略宽（含 `openai`、`anthropic` 等公司名）。

### 4.4 字段映射

| DB 字段 | HN 字段 / 规则 |
|---------|----------------|
| `type` | 固定 **`news`** |
| `source` | 固定 **`hn`** |
| `external_id` | `id`（字符串） |
| `title` | `title`（英文原文） |
| `title_zh` | 翻译结果 |
| `summary` | `text` 去 HTML，截 500 字 |
| `summary_zh` | 翻译结果 |
| `url` | `url` 或 `https://news.ycombinator.com/item?id={id}` |
| `image_url` | `resolveImageUrl(url, author)` |
| `author` | `by` |
| `score` | `score` |
| `comment_count` | `descendants` ?? 0 |
| `published_at` | `time`（Unix 秒 → DATETIME） |
| `tags` | `["hn-top","ai-news"]` |
| `synced_at` | `NOW()` |

**唯一键**：`(source, external_id)` — 同一条 HN 帖子 project 与 news 不应重复；Show HN 只进 project，其余 AI 帖进 news。

### 4.5 与 project 同步的关系

| 同步任务 | HN 端点 | `type` | 说明 |
|----------|---------|--------|------|
| 已有 | `showstories.json` | `project` | Show HN 项目 |
| **新增** | `topstories.json` (+可选 `newstories`) | **`news`** | AI 行业新闻与讨论 |

`POST /api/vibecoding/sync` 建议行为：

```javascript
// 方案 A（推荐）：一次 sync 全跑
await syncHnShowOnce();   // 已有 → type=project
await syncHnNewsOnce();   // 新增 → type=news
return { ok: true, projectCount, newsCount };

// 方案 B：query 分流
POST /api/vibecoding/sync?scope=news
POST /api/vibecoding/sync?scope=project
POST /api/vibecoding/sync?scope=all   // 默认
```

定时任务 `scheduler.js` 里现有 `syncVibecodingOnce()` 改为同时跑 news，或内部依次调用。

---

## 五、建议修改的文件（zuqiu/server）

```
server/
├── src/
│   ├── sync/
│   │   └── vibecodingSync.js       🔧 新增 syncHnNewsOnce()
│   ├── routes/
│   │   └── vibecodingRoutes.js     🔧 POST /sync 返回 projectCount + newsCount（可选）
│   ├── repositories/
│   │   └── vibecodingRepo.js       ✅ 若已支持 type 过滤则不用改
│   └── utils/
│       └── vibecodingMeta.js       ✅ 复用 translate / resolveImageUrl / decodeHtml
└── .env.example                    🔧 可选 VIBECODING_NEWS_LIMIT=60
```

**无需新 SQL 迁移**（表结构已含 `type` 枚举语义）。

---

## 六、环境变量（可选）

```env
# 已有
VIBECODING_SYNC_MS=1800000
VIBECODING_TRANSLATE=true

# 可选新增
VIBECODING_NEWS_TOP_LIMIT=60      # topstories 抓取条数
VIBECODING_NEWS_NEW_LIMIT=40      # newstories 抓取条数
```

---

## 七、部署与验收

### 7.1 zuqiu 服务器

```bash
cd /www/wwwroot/zuqiu/server

git pull

pm2 restart zuqiu-api

# 全量同步（含新闻，首次约 2～4 分钟）
curl -X POST https://api.yimingyinglou.top/api/vibecoding/sync
```

### 7.2 zuqiu-api 直验

```bash
# 1. 新闻列表非空
curl -s "https://api.yimingyinglou.top/api/vibecoding/items?type=news&page=1&limit=5&sort=recent" \
  | jq '{total: .data.total, count: (.data.items|length), types: [.data.items[].type]|unique, first: .data.items[0].title}'

# 2. 条目 type 均为 news
curl -s "https://api.yimingyinglou.top/api/vibecoding/items?type=news&limit=10" \
  | jq '[.data.items[].type] | unique'
# 期望: ["news"]

# 3. 与 project 互不干扰
curl -s "https://api.yimingyinglou.top/api/vibecoding/items?type=project&limit=3" \
  | jq '[.data.items[].type] | unique'
# 期望: ["project"]
```

### 7.3 验收清单

```
[ ] GET ...?type=news 返回 code=0
[ ] data.total > 0
[ ] items[].type 全部为 "news"
[ ] items[].imageUrl 非空
[ ] items[].title / summary 有中文（翻译可用时）
[ ] items[].publishedAt 为合法 ISO 时间
[ ] POST /api/vibecoding/sync 后 news 数量增加
[ ] project 同步不受影响（type=project 仍有 ~30 条 Show HN）
```

### 7.4 RuleHub 侧（zuqiu 完成后）

RuleHub 已接好 BFF 与页面，**无需改接口代码**，仅部署：

```bash
cd /www/wwwroot/www.yimingyinglou.top
git pull && npm run build && pm2 restart rulehub
```

浏览器验收：

- https://www.yimingyinglou.top/vibecoding/news  
- 顶部 Tab 可切换「项目鉴赏 / AI 最新消息」

RuleHub BFF 验：

```bash
curl -s "https://www.yimingyinglou.top/api/vibecoding/items?type=news&page=1&limit=3&sort=recent" \
  | jq '{success, total, count: (.items|length)}'
```

---

## 八、参考代码片段（syncHnNewsOnce 伪代码）

```javascript
const KEYWORDS = [
  'ai', 'llm', 'gpt', 'claude', 'openai', 'anthropic', 'agent', 'cursor',
  'gemini', 'deepseek', 'model', 'benchmark', 'nvidia', 'machine learning',
];

function isAiNews(item) {
  if (!item?.title || item.deleted || item.dead) return false;
  if (/^show hn:/i.test(item.title)) return false;
  const blob = `${item.title} ${stripHtml(item.text || '')}`.toLowerCase();
  return KEYWORDS.some((k) => blob.includes(k));
}

async function syncHnNewsOnce() {
  const topIds = (await fetchJson(TOP_STORIES_URL)).slice(0, NEWS_TOP_LIMIT);
  const newIds = (await fetchJson(NEW_STORIES_URL)).slice(0, NEWS_NEW_LIMIT);
  const ids = [...new Set([...topIds, ...newIds])];

  let count = 0;
  for (const id of ids) {
    const item = await fetchJson(`${ITEM_URL}/${id}.json`);
    if (!isAiNews(item)) continue;

    const title = decodeHtml(item.title);
    const summary = stripHtml(item.text || '').slice(0, 500);
    await upsertItem({
      type: 'news',
      source: 'hn',
      externalId: String(item.id),
      title,
      titleZh: await translateToZh(title),
      summary,
      summaryZh: await translateToZh(summary),
      url: item.url || `https://news.ycombinator.com/item?id=${item.id}`,
      imageUrl: resolveImageUrl(item.url, item.by),
      author: item.by || '',
      score: item.score || 0,
      commentCount: item.descendants || 0,
      tags: ['hn-top', 'ai-news'],
      publishedAt: new Date(item.time * 1000),
    });
    count++;
    await sleep(240);
  }
  return count;
}
```

---

## 九、后续扩展（可选）

| 功能 | 说明 |
|------|------|
| **新闻全文 `content`** | ⭐ 见专篇 **`zuqiu-api-vibecoding-content-TODO.md`** |
| 多数据源 | `source=reddit` / `source=rss`，RuleHub 仍用 `type=news` |
| 手动精选新闻 | `source=manual`，管理端 POST 写入 |
| 按标签筛选 | API 加 `tag=ai-news`（RuleHub 暂未用） |
| 翻译失败告警 | sync 日志记录 `translate_failed` 计数 |

---

## 十、相关文档

| 文档 | 路径 |
|------|------|
| VibeCoding 总清单（含 project） | `ruleHub/docs/zuqiu-api-vibecoding-TODO.md` |
| 后端完整规范 | `ruleHub/docs/zuqiu-api-vibecoding-backend.md` |
| RuleHub 新闻页 | `/vibecoding/news` |
| RuleHub BFF | `src/app/api/vibecoding/items/route.ts` |

---

*文档版本：2026-07-08 · AI 最新消息（type=news）专篇 · 给 zuqiu 项目维护者*
