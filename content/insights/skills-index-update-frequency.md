---
title: RuleHub 的 Skills 索引多久更新一次？
description: 说明 RuleHub 如何从 GitHub 同步 Agent Skills 索引，以及 star 数、更新时间等字段的刷新逻辑。
author: RuleHub 编辑组
publishedAt: 2026-08-01
tags: Agent Skills, 索引, RuleHub, 运维
category: 产品
---

# 索引从哪里来？

RuleHub 不自己「生成」 skill，而是定期从 **公开的 GitHub 仓库** 抓取包含 `SKILL.md` 的项目，建立可搜索的目录。你在详情页看到的 star 数、更新时间、描述等，均来自最近一次成功同步时的 GitHub 元数据。

# 更新频率

- **热门 / 活跃仓库**：通常会在较短的周期内被再次抓取，star 与 `updatedAt` 会相对新鲜
- **长尾仓库**：若长期无 commit，索引中的「更新时间」可能停留在上次活跃时间
- **新发布的 skill**：从 GitHub 公开到出现在 RuleHub，取决于全量/增量爬取排期，一般不需要手动提交

我们持续优化抓取策略，在资源允许的情况下提高头部仓库的刷新频率。

# 详情页上的「实时索引」

部分 skill 详情会标注 **· 实时索引**，表示该条数据来自在线 API 而非仅本地缓存。无论是否标注，安装前仍建议在 GitHub 上查看最新 commit。

# 发现索引有误怎么办？

1. 在 GitHub 确认仓库是否公开、`SKILL.md` 是否在默认分支
2. 通过 [联系我们](/contact) 反馈错误链接或过期数据
3. 若仓库已删除或改名，索引会在后续同步中下线或更新

# 与 skill 作者的关系

RuleHub **不会**自动修改你的 GitHub 仓库。你在本地安装、fork 或修改 skill 后，需要自行 push 到 GitHub；索引会在下次抓取时反映你的变更。
