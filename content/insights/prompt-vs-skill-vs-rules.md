---
title: Prompt、Rules、Skill 怎么选？一张图说清三者边界
description: 对比一次性 Prompt、IDE Rules 与 Agent Skill 的适用场景、维护成本与组合方式，帮助减少指令冲突。
author: RuleHub 编辑组
publishedAt: 2026-07-12
tags: Prompt, Rules, Agent Skills, 概念
category: 教程
---

# 先给结论

- **Prompt**：这一次对话里的临时指令，用完即弃或留在聊天记录。
- **Rules**：项目或用户级的长期约束，几乎每次会话都生效。
- **Skill**：可复用的任务模块（常为 `SKILL.md`），按需加载，解决一类重复工作。

选错层，会出现两种病：要么每次重复粘贴长 Prompt；要么 Rules 里塞满专项流程，导致上下文臃肿、模型「记不住重点」。

# 对比表

| 维度 | Prompt | Rules | Skill |
|------|--------|-------|-------|
| 生命周期 | 单次 / 短 | 长期 | 长期，按需 |
| 典型长度 | 几句到一段 | 短中篇 | 中篇结构化 |
| 变更方式 | 改聊天 | 改配置/文件并评审 | 改 Markdown 并版本化 |
| 最佳用途 | 当次微调 | 风格与安全底线 | 可重复 SOP |
| 失败表现 | 忘了再说一遍 | 全局副作用 | 加载错 Skill |

# 决策树（简化）

1. 这件事以后还会反复做吗？否 → 用 Prompt。
2. 是「所有任务都要遵守」的底线吗？是 → 写 Rules。
3. 是「某一类任务的标准作业」吗？是 → 写 Skill。
4. 三者都需要？可以叠加：Rules 打底，Skill 管流程，Prompt 补当次变量。

# 组合示例：给仓库加洞察文章页

- Rules：禁止引入新 CSS 框架；必须通过 `npm run build`
- Skill：新建 Markdown 文章的 front matter 与目录约定
- Prompt：「这一篇写 Cursor Rules，偏实操，内链到已有文章」

AI 同时看到三层时，优先级建议在 Skill 里写清：「与 Rules 冲突时以 Rules 为准」。

# 常见混乱与纠正

## 把 Skill 写成博客

长篇背景故事对人类友好，对执行型模型是噪音。背景一段即可，重点放步骤与禁忌。详见 [SKILL.md 格式](/insights/skill-md-format-guide)。

## 把 Rules 写成百科

百科应放文档站；Rules 只保留 AI 必须遵守的子集。

## 只用 Prompt 堆历史

聊天里「如上所述」依赖脆弱。稳定流程请外提为 Skill，并在 [RuleHub](/insights) 或团队库沉淀。

# 对个人与团队的建议

## 个人

先允许自己用 Prompt 探索；同一 Prompt 用到第三次，就提炼成 Skill 草稿。

## 团队

Rules 变更走 PR；Skills 有目录与维护者；禁止在群里只发截图 Prompt 当规范。参见 [团队 Skills 库](/insights/team-skills-library)。

# 与工具生态的关系

Cursor、Claude Code、Codex 对 Rules / Skills 的载体不同，但分层思想一致。换工具时，优先迁移 Skills 与关键 Rules，而不是迁移几千条聊天记录。选型参考 [2026 AI 编程助手对比](/insights/ai-coding-assistant-comparison-2026)。

# 小结

Prompt 求快，Rules 求稳，Skill 求复用。刻意分层，能减少指令冲突，也能让 AI 编程资产像代码一样可维护。

下一步：打开你最近三天的 AI 对话，标出重复出现的指令，分别丢进 Rules 或新建一条 Skill。
