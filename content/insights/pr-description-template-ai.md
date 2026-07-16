---
title: PR 描述怎么写：给人类审查者也给未来的 AI
description: 提供结构化 PR 模板，使人工 Code Review 与后续 AI 续作都能快速理解动机、风险与验证方式。
author: RuleHub 编辑组
publishedAt: 2026-07-16
tags: Pull Request, Code Review, 协作, 模板
category: 实践指南
---

# PR 描述是交接文档

写得好，审查快；写得差，AI 续作也会猜错上下文。把 PR 当「给下一任作者的 Skill 输入」。

# 推荐模板

1. **背景**：为什么做  
2. **变更**：做了什么（列表）  
3. **不做**：明确非目标  
4. **风险**：数据、权限、迁移、依赖  
5. **验证**：跑过的命令与手测步骤  
6. **截图/录屏**：UI 变更时  
7. **后续**：已知债与链接

可与 [AI Code Review](/insights/ai-code-review-checklist) 话术配合：先让模型按描述检查「是否完成声称项」。

# AI 生成描述时的纪律

- 必须基于真实 diff，禁止空喊「提升性能」
- 不确定的验证步骤标为未跑
- 安全相关变更强制填写风险节

发布说明类写作见 [Changelog](/insights/ai-changelog-release-notes)。

# 小结

好的 PR 描述降低协作熵，也为多会话、多模型交接提供燃料。

下一步：把模板放进仓库 `PULL_REQUEST_TEMPLATE.md`。
