---
title: SKILL.md 格式详解：写出 AI 真正会执行的说明文档
description: 手把手拆解 SKILL.md 的推荐章节结构、写作语气与验收标准，附可直接套用的写作清单。
author: RuleHub 编辑组
publishedAt: 2026-07-02
tags: SKILL.md, 写作指南, Agent Skills, 最佳实践
category: 教程
---

# 为什么格式很重要？

AI 助手解析 Skill 时，并没有「人类读者的耐心」。结构混乱、目标模糊的文档，会导致模型抓错重点，甚至忽略安全约束。好的 `SKILL.md` 像 API 文档：字段清晰、边界明确、示例可运行。

本文基于 RuleHub 收录的大量开源 Skills 归纳而来，适合作为你撰写或评审 Skill 的检查表。

# 推荐文档结构

## 1. 元信息区（Front Matter 或首段）

在文件开头用简短段落说明：

- Skill 名称
- 版本或维护者（可选）
- 一句话价值主张

示例：`本 Skill 用于在 Next.js App Router 项目中生成符合团队规范的 API Route 骨架。`

## 2. 触发条件（When to use）

明确列出**应当启用**与**不应启用**的场景。这是减少误用的第一道闸。

- 应当启用：新建 `app/api/**/route.ts` 文件时
- 不应启用：修改纯 UI 组件、编写 E2E 测试脚本时

## 3. 前置依赖（Prerequisites）

列出环境、工具版本、需要先读取的文件。例如：

- Node.js ≥ 18
- 已存在 `src/lib/db.ts` 数据库客户端
- 先阅读 `docs/api-conventions.md`

## 4. 分步流程（Procedure）

用有序步骤描述 AI 应做什么，每一步尽量**可验证**：

1. 询问用户资源名与 HTTP 方法
2. 在 `src/app/api/{resource}/route.ts` 创建处理器
3. 使用 Zod 校验请求体
4. 返回统一 `{ data, error }` JSON 结构
5. 补充对应单元测试文件路径

避免「帮我把 API 写好」这类不可执行的模糊指令。

## 5. 输出标准（Definition of Done）

写清交付物清单：哪些文件必须出现、测试是否通过、是否需要更新文档。AI 需要知道「停在哪里算完成」。

## 6. 反模式（Anti-patterns）

这是高质量 Skill 与普通 Prompt 的分水岭。典型条目：

- 禁止在 Route 中直接写 SQL 字符串
- 禁止跳过错误处理返回 200
- 禁止引入未在 `package.json` 中的依赖

## 7. 示例（Examples）

至少提供一个**输入 → 过程 → 输出**的完整样例。若涉及代码，给出期望的文件树或 diff 摘要。

# 写作语气与粒度

## 用祈使句，不用散文

推荐：「读取 `package.json` 确认是否已安装 zod。」  
避免：「也许你可以看看项目里有没有 zod 之类的库吧。」

## 一条 bullet 只做一件事

过长段落会被模型 skimming。把复合动作拆成多步。

## 数字与路径要具体

「相关目录」不如 `src/components/ui/` 清晰；「几个测试」不如「至少 2 个用例：成功与 400 错误」清晰。

# 质量自检清单

发布 Skill 前，逐项勾选：

- 新人仅凭本文能否完成一次完整任务？
- 是否写明禁止操作与安全边界？
- 是否指定与本仓库一致的命名、目录、测试命令？
- 是否有至少一个端到端示例？
- 是否在 150～400 行之间（过长考虑拆分多个 Skill）？
- 是否标注了维护者与最后更新日期？

# 与 RuleHub 索引的关系

RuleHub 抓取的 `SKILL.md` 会展示在 Skill 详情页。结构清晰、关键词准确的文档，更容易被搜索命中，也更容易被其他开发者 Fork 改进。

你可以在 [RuleHub 搜索](/search) 中打开排名靠前的 Skills，对照其章节安排——这是最快的学习方式。

# 进阶：Skill 组合与拆分

当一个 Skill 同时覆盖「数据库迁移 + API + 前端表单」时，维护成本会陡增。建议按**单一职责**拆分，再用上层 Skill 做编排：

- `db-migration-skill`
- `api-route-skill`
- `form-scaffold-skill`
- `feature-vertical-slice-skill`（编排以上三者）

# 小结

`SKILL.md` 不是博客文章，而是**面向 AI 执行者的规范文档**。好的格式 = 清晰的触发条件 + 可验证步骤 + 明确禁忌 + 真实示例。按本文结构撰写，你的 Skill 在 Claude Code、Codex 或 Cursor 中的表现会明显更稳定。

相关阅读：[如何为 Claude 挑选合适的 Skills](/insights/how-to-pick-claude-skills)。
