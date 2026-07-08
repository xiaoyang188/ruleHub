# zuqiu-api 待办 · 新闻全文抓取（content 字段）

> **请在 `zuqiu/server` 仓库完成以下工作。**  
> RuleHub 只消费 API；**抓取、存库、翻译在 zuqiu-api 完成。**  
> RuleHub 会在字段就绪后更新文章页渲染全文（`content` / `contentZh`）。

**背景：** 当前新闻文章页只展示 `summary`，而 HN 链接帖常无 `text`，导致页面显示「暂无摘要」。需要同步时抓取原文页 **全文**，写入新字段 `content`，供 RuleHub 站内阅读。

**相关文档：**

- 新闻同步总览：`docs/zuqiu-api-vibecoding-news-TODO.md`
- VibeCoding 总清单：`docs/zuqiu-api-vibecoding-TODO.md`

---

## 一、要改什么（总览）

| 项 | 是否新建 | 说明 |
|----|----------|------|
| REST 路由 | ❌ 不新建 | 仍用 `GET /api/vibecoding/items`、`GET /api/vibecoding/items/:id` |
| 数据库 | ✅ 增量迁移 | 新增 `content*` 列 |
| 同步逻辑 | ✅ 扩展 | 仅 **`type=news`** 抓取原文全文 |
| 列表接口 | ⚠️ 注意 | **列表不返回全文**（体积大），仅详情返回 |
| 翻译 | ✅ 建议 | `content_zh` 全文或分段翻译 |

---

## 二、数据库增量迁移

新建 `sql/migration-vibecoding-content.sql`：

```sql
ALTER TABLE vibecoding_items
  ADD COLUMN content         MEDIUMTEXT NULL COMMENT '原文全文（Markdown 或 HTML 源码）' AFTER summary_zh,
  ADD COLUMN content_zh      MEDIUMTEXT NULL COMMENT '中文全文' AFTER content,
  ADD COLUMN content_format  VARCHAR(16) NOT NULL DEFAULT '' COMMENT 'markdown | html | plain' AFTER content_zh,
  ADD COLUMN content_status  VARCHAR(16) NOT NULL DEFAULT 'pending' COMMENT 'pending | ok | failed | skipped' AFTER content_format,
  ADD COLUMN content_fetched_at DATETIME NULL COMMENT '全文抓取时间' AFTER content_status;
```

`package.json` 增加：

```json
"db:migrate:vibecoding-content": "node src/scripts/migrate-vibecoding-content.js"
```

---

## 三、API 响应契约（camelCase，RuleHub 已预留对接）

### 3.1 列表 `GET /api/vibecoding/items?type=news&...`

**不要返回 `content` / `contentZh`**（避免列表 payload 过大）。  
`mapRow` 列表模式省略正文字段，仅保留：

```javascript
{
  id, type, source, externalId,
  title, titleEn, titleZh,
  summary, summaryEn, summaryZh,   // 卡片摘要仍用 summary
  url, imageUrl, author, score, commentCount, tags,
  publishedAt, syncedAt, isFeatured
  // 无 content
}
```

若 `summary` 为空，同步时应从正文前 500 字或 `og:description` 自动生成摘要。

### 3.2 详情 `GET /api/vibecoding/items/:id`

**必须返回正文字段：**

```json
{
  "code": 0,
  "data": {
    "id": 545,
    "type": "news",
    "title": "Mechanized type inference for record concatenation as in Nix",
    "titleZh": "Nix 式记录连接的类型推断机械化……",
    "summary": "本文介绍……",
    "summaryZh": "本文介绍……",
    "content": "# Introduction\n\nRecord concatenation …",
    "contentZh": "# 引言\n\n记录连接 …",
    "contentFormat": "markdown",
    "contentStatus": "ok",
    "contentFetchedAt": "2026-07-08T12:00:00.000Z",
    "url": "https://haskellforall.com/2026/07/mechanized-type-inference-for-record-concatenation",
    "imageUrl": "https://…",
    "author": "fanf2",
    "score": 1,
    "commentCount": 0,
    "publishedAt": "2026-07-08T11:42:04.000Z",
    "syncedAt": "2026-07-08T12:00:00.000Z"
  }
}
```

### 3.3 字段说明

| DB 列 | JSON 字段 | 说明 |
|-------|-----------|------|
| `content` | `content` | 原文全文，优先 **Markdown** |
| `content_zh` | `contentZh` | 中文全文（翻译后） |
| `content_format` | `contentFormat` | `markdown` / `html` / `plain` |
| `content_status` | `contentStatus` | `ok` 成功 / `failed` 失败 / `skipped` 不抓取 / `pending` 未处理 |
| `content_fetched_at` | `contentFetchedAt` | ISO 8601 |

**RuleHub 展示优先级（文章页，待 zuqiu 完成后实现）：**

```
正文 = contentZh || content || summaryZh || summary
格式 = contentFormat（markdown 用 Markdown 渲染，html 需消毒后渲染）
```

---

## 四、同步流程（仅 news）

在 `syncHnNewsOnce()` 每条通过 AI 关键词过滤后：

```
1. 解析 HN item（title, url, text, by, score…）
2. summary = HN text 去 HTML；若空 → fetchOgDescription(url)
3. 若 type=news 且 url 为外链：
     a. full = await fetchArticleContent(url)   // 见第五节
     b. content = full.body
     c. content_format = full.format          // markdown | html | plain
     d. content_status = full.ok ? 'ok' : 'failed'
     e. 若 summary 仍空且 content 有值 → summary = content 前 500 字
     f. imageUrl = full.ogImage || resolveImageUrl(url, author)
4. titleZh = await translateToZh(title)
5. summaryZh = summary ? await translateToZh(summary) : ''
6. contentZh = content ? await translateToZh(content) : ''   // 见 4.2 长文策略
7. upsertItem({ …所有字段… })
8. sleep(300~500ms)   // 抓网页 + 翻译，比纯 HN 慢
```

**`type=project`（Show HN）可不抓全文**，保持现状。

---

## 五、全文抓取实现建议

新建 `src/utils/vibecodingArticleFetch.js`。

### 5.1 请求

```javascript
const res = await fetch(url, {
  headers: {
    'User-Agent': 'RuleHub-VibeCoding/1.0 (+https://www.yimingyinglou.top)',
    Accept: 'text/html,application/xhtml+xml',
  },
  signal: AbortSignal.timeout(15000),
  redirect: 'follow',
});
```

### 5.2 正文提取（推荐顺序）

| 步骤 | 做法 |
|------|------|
| 1 | 用 **Mozilla Readability**（`@mozilla/readability` + `jsdom`）提取 `<article>` 主内容 |
| 2 | 用 **Turndown** 将 HTML 转 **Markdown** 存库（RuleHub 易渲染、较安全） |
| 3 | 失败时 fallback：`og:description` → `meta description` → 空 |

**可选 npm 依赖：**

```bash
npm install @mozilla/readability jsdom turndown
```

**伪代码：**

```javascript
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');
const TurndownService = require('turndown');

async function fetchArticleContent(url) {
  const html = await fetchHtml(url);
  if (!html) return { ok: false, body: '', format: 'plain' };

  const dom = new JSDOM(html, { url });
  const reader = new Readability(dom.window.document);
  const article = reader.parse();

  if (article?.content) {
    const td = new TurndownService({ headingStyle: 'atx' });
    const markdown = td.turndown(article.content).slice(0, 50000);
    return {
      ok: markdown.length > 80,
      body: markdown,
      format: 'markdown',
      ogImage: extractOgImage(html),
      title: article.title,
    };
  }

  const desc = extractOgDescription(html);
  return {
    ok: Boolean(desc),
    body: desc,
    format: 'plain',
    ogImage: extractOgImage(html),
  };
}
```

### 5.3 限制与安全

| 项 | 建议 |
|----|------|
| 单篇最大长度 | `content` 截断 **50KB**（约 5 万字符） |
| 超时 | 单次 fetch **15s** |
| 域名 | 跳过 `news.ycombinator.com`（讨论页不是文章） |
| 失败 | `content_status='failed'`，仍保留 title/url/summary |
| 重试 | 下次 sync 对 `failed` / `pending` 重试（可选） |
| HTML 存储 | 若存 `html` 格式，RuleHub 侧必须消毒；**优先 Markdown** |

### 5.4 环境变量

```env
VIBECODING_FETCH_CONTENT=true          # 是否抓全文，默认 true（news）
VIBECODING_CONTENT_MAX_BYTES=51200
VIBECODING_CONTENT_TIMEOUT_MS=15000
VIBECODING_CONTENT_DELAY_MS=400        # 每条新闻抓取间隔
VIBECODING_TRANSLATE=true              # 是否翻译 content_zh
VIBECODING_TRANSLATE_CONTENT=true      # 长文翻译可单独关闭
```

---

## 六、长文翻译策略

全文翻译耗时长、易限流，建议：

**方案 A（推荐 v1）：** 只翻译 `title` + `summary`，正文 `content` 保持英文 Markdown，RuleHub 仍可读。

**方案 B（完整中文）：** 翻译 `content_zh`：

- 按段落拆分，每段 ≤ 4000 字符
- 逐段 `translateToZh`，段间 `sleep(120ms)`
- 拼接写入 `content_zh`
- 23 条新闻 × 10 段 ≈ 数分钟，可接受在定时任务里跑

**方案 C（按需）：** 详情接口首次访问时再翻译并写库（需加缓存逻辑，v2）。

RuleHub 期望：**至少 `content` 有 Markdown 英文全文**；`contentZh` 有则优先展示。

---

## 七、Repository 改动

### 7.1 `upsertItem` 新增字段

```javascript
content, contentZh, contentFormat, contentStatus, contentFetchedAt
```

### 7.2 `mapRow(row, { includeContent = false })`

```javascript
function mapRow(row, opts = {}) {
  const base = {
    id: row.id,
    type: row.type,
    // …现有字段…
    title: row.title_zh || row.title,
    summary: row.summary_zh || row.summary || '',
  };
  if (opts.includeContent) {
    base.content = row.content || '';
    base.contentZh = row.content_zh || '';
    base.contentFormat = row.content_format || '';
    base.contentStatus = row.content_status || 'pending';
    base.contentFetchedAt = row.content_fetched_at
      ? new Date(row.content_fetched_at).toISOString()
      : null;
  }
  return base;
}
```

- `listItems` → `mapRow(row, { includeContent: false })`
- `getById` → `mapRow(row, { includeContent: true })`

---

## 八、建议文件清单

```
server/
├── sql/
│   └── migration-vibecoding-content.sql     ⬜ 新建
├── src/
│   ├── utils/
│   │   ├── vibecodingMeta.js                ✅ 已有（OG、翻译）
│   │   └── vibecodingArticleFetch.js        ⬜ 新建（Readability + Turndown）
│   ├── sync/
│   │   └── vibecodingSync.js                🔧 news 分支加全文抓取
│   ├── repositories/
│   │   └── vibecodingRepo.js                🔧 upsert + mapRow 分列表/详情
│   └── scripts/
│       └── migrate-vibecoding-content.js    ⬜ 新建
└── package.json                             🔧 迁移脚本 + 可选依赖
```

---

## 九、部署与验收

### 9.1 部署

```bash
cd /www/wwwroot/zuqiu/server
git pull
npm install                    # 若加了 readability/jsdom/turndown
npm run db:migrate:vibecoding-content
pm2 restart zuqiu-api

# 全量同步（含抓全文，耗时会明显变长）
curl -X POST https://api.yimingyinglou.top/api/vibecoding/sync
```

### 9.2 验收清单

```
[ ] 迁移成功，表中有 content / content_zh / content_format 列
[ ] GET /api/vibecoding/items?type=news 列表响应 **不含** content 字段
[ ] GET /api/vibecoding/items/545 详情含 content，长度 > 200
[ ] contentFormat 为 markdown 或 plain
[ ] contentStatus 大部分为 ok
[ ] summary 非空（由正文或 OG 生成）
[ ] type=project 条目不受影响，无 content 或 content 为空
[ ] 重新 sync 后 id=545 不再出现空摘要
```

### 9.3 验收命令

```bash
# 详情应有全文
curl -s "https://api.yimingyinglou.top/api/vibecoding/items/545" \
  | jq '.data | {title, summaryLen: (.summary|length), contentLen: (.content|length), contentFormat, contentStatus}'

# 列表不应带 content（字段不存在或为空）
curl -s "https://api.yimingyinglou.top/api/vibecoding/items?type=news&limit=2" \
  | jq '.data.items[0] | keys | map(select(startswith("content")))'
# 期望: []
```

---

## 十、RuleHub 侧（zuqiu 完成后）

zuqiu 字段上线并 re-sync 后，RuleHub 将：

1. 扩展 `VibecodingItem` 类型：`content`、`contentZh`、`contentFormat`、`contentStatus`
2. 文章页 `/vibecoding/news/[id]` 优先渲染 `contentZh || content`（Markdown）
3. 无正文时 fallback 到 `summary`，再 fallback「阅读原文」

**RuleHub 不需要 zuqiu 改路由**，只需详情 JSON 带上上述字段。

---

## 十一、常见问题

**Q：为什么列表不返回 content？**  
A：单篇全文可能 10～50KB，列表 20 条会撑爆响应；仅详情页需要。

**Q：GitHub README / Twitter 链接怎么办？**  
A：Readability 失败则 `content_status=failed`，保留 `summary` + 外链按钮；Twitter 等可 `skipped`。

**Q：会不会侵权？**  
A：站内展示抓取摘要/全文仅供阅读跳转，底部保留「阅读原文」外链；生产环境建议仅抓公开博客/RSS 类站点。

**Q：同步太慢？**  
A：可 `VIBECODING_FETCH_CONTENT=true` 仅对新条目抓取；旧条目 `content_status=pending` 分批补抓。

---

*文档版本：2026-07-08 · 新闻全文 content 字段 · 给 zuqiu 项目维护者*
