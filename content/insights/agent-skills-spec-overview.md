---
title: Agent Skills 规范速读：写给开发者的非官方导览
description: 用通俗语言梳理 Agent Skills / SKILL.md 生态中常见约定、元信息与互操作注意点，帮助你写出更可移植的 Skill。
author: RuleHub 编辑组
publishedAt: 2026-07-16
tags: Agent Skills, 规范, SKILL.md, 互操作
category: 教程
---

# 为什么要关心「规范」

各工具对 Skills 的加载方式不完全相同，但社区正朝「一份 Markdown，多处可用」收敛。了解常见约定，能减少「在 A 工具好用、换 B 工具失效」的情况。站内文档入口见 [/docs/spec](/docs/spec) 与 [/docs/skill](/docs/skill)。

# 你至少要统一的三件事

## 1. 文件身份

多数实践以 `SKILL.md`（或工具指定文件名）作为入口。名称、简介放在文首或 front matter，便于索引与人类浏览。

## 2. 可执行结构

触发条件、步骤、完成定义、反模式——这不是文风偏好，而是互操作的最小公约数。详见 [格式指南](/insights/skill-md-format-guide) 与 [反模式](/insights/skill-anti-patterns-guide)。

## 3. 作用域声明

写明适用栈与不适用场景。缺少作用域的 Skill，在跨仓库传播时最容易被误用。

# 元信息建议字段

即便工具尚未强制解析 YAML，建议仍保持可解析的头部字段：`name`、`description`、`version`、`author`。RuleHub 洞察文用 `title/description/tags` 同理——稳定字段利于展示与 SEO。

# 互操作注意点

- 避免依赖某一 IDE 私有 UI 才能完成的步骤；优先仓库内文件与终端命令
- 路径用相对仓库根目录的写法
- 不要假设模型一定能上网；需要外网时写清前置条件
- 许可证与来源在本地化时保留，见 [本地化清单](/insights/localize-open-source-skills)

# 与官方文档的关系

本文是实践导览，不是替代官方规范全文。当官方字段或目录约定更新时，以官方与你所用工具文档为准，并回写团队 Skills 库。

# 小结

把 Skill 当成「有结构的接口文档」而不是随笔，你就已经走在可移植的路上。规范细节会演进，但清晰结构与作用域永远值钱。

下一步：对照 [/docs/spec](/docs/spec) 检查你们仓库里最常用的一条 Skill，补齐缺失章节。
