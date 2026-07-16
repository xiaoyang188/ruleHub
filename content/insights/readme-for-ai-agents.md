---
title: 设计给 AI 读的仓库 README：结构、命令与贡献约定
description: 说明如何把 README 写成对人类与 AI 编程助手同时友好的入口文档，减少会话开头的重复解释。
author: RuleHub 编辑组
publishedAt: 2026-07-16
tags: README, 文档, Agent Skills, 协作
category: 教程
---

# README 是仓库的第一段上下文

无论 Cursor 还是 Claude Code，很多会话会先读 README。若 README 只有徽章和空洞口号，模型只能猜。写好入口文档，等于给所有 AI 会话提供免费的项目简报。

# 建议章节

1. **一句话产品说明**
2. **技术栈与版本**
3. **本地启动命令**（安装、开发、构建、测试）
4. **目录地图**（`src/app`、`content`、关键 lib）
5. **工程约定摘要**（或指向 Rules / Skills 路径）
6. **如何贡献**（分支、PR、Commit 约定）
7. **联系与安全披露**（可链到 [/contact](/contact)）

# 对 AI 特别有用的写法

- 命令写成可复制代码块，注明包管理器
- 明确「不要改」的生成目录
- 写清环境变量名（不要写真实密钥）
- 指向示例：`content/insights/README.md` 这类内容贡献说明

# README 与 Skills / Rules 分工

| 内容 | README | Rules | Skill |
|------|--------|-------|-------|
| 如何启动项目 | 主放 | 可摘要 | 否 |
| 编码风格细节 | 链出去 | 主放 | 否 |
| 重复任务 SOP | 链出去 | 否 | 主放 |

README 保持短；细节进 Rules 与 Skills，避免三处复制漂移。概念边界见 [Prompt vs Rules vs Skill](/insights/prompt-vs-skill-vs-rules)。

# 常见失败

- 只贴截图不贴命令
- 启动步骤过期（Node 版本已变）
- 用「显而易见」省略关键路径
- 中英文混杂且无统一术语（Skill / Rules 名称乱跳）

# 维护节奏

依赖或脚本变更时，同一 PR 更新 README。可在发布 Skill 里加一条：若改了 `package.json` scripts，必须同步 README 命令表。

# 小结

面向 AI 的 README 不是另起炉灶，而是把「克隆后怎样正确工作」写清楚。它降低人类 onboarding 成本，也降低模型胡猜成本。

下一步：打开根 README，补全「安装—开发—构建—测试」四条命令与目录地图。
