---
title: 搜索体验与 Skills 市场：相关性比「更多结果」更重要
description: 从产品角度讨论 Skills 搜索的排序信号、空结果引导与查询理解，避免只堆数量不重匹配。
author: RuleHub 编辑组
publishedAt: 2026-07-16
tags: 搜索, 产品, Agent Skills, UX
category: 实践指南
---

# 用户要的是「准」

Skills 市场若返回大量弱相关结果，用户会离开。AI 编程者时间贵，搜 `prisma migrate` 却置顶无关「AI 心灵鸡汤」Skill，是信任损伤。

# 可解释的排序信号（示例）

- 标题与简介文本匹配
- 最近维护时间
- 文档完整度（是否含步骤/反模式）
- 创作者可信度（可选）

对外不必公开公式，对内要有产品原则。发现端入口：[/search](/search)。

# 空结果与少结果

引导换词、去分类页、或读一篇入门文（如 [如何挑选 Skills](/insights/how-to-pick-claude-skills)）。空状态设计见 [空与错](/insights/empty-and-error-states-ai)。

# 查询理解

可做同义词（claude skill / agent skill），但要克制，避免过度扩展导致更脏。记录无点击查询，反哺同义词表。

# 小结

搜索是 Skills 市场的大门。相关性、可解释与空结果运营，比单纯炫耀索引量更能留住开发者。

下一步：抽样 20 个真实查询，人工看前 5 条是否「说得通」。
