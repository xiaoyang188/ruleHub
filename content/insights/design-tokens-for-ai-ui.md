---
title: 设计 Token 与主题：让 AI 少写魔法数字
description: 介绍在有 CSS 变量 / 设计 token 的项目里，如何约束 AI 使用主题色与间距，并完善亮暗色切换体验。
author: RuleHub 编辑组
publishedAt: 2026-07-16
tags: 设计系统, CSS 变量, 主题, 前端
category: 教程
---

# 魔法数字从哪来

AI 生成 UI 时喜欢随手写 `#d99178`、`16px`、`rgba(0,0,0,.5)`。项目若已有 token（如 `--color-primary`），这些硬编码会造成亮暗色不一致与后续主题翻车。

# 约束怎么写

在 Rules / 前端 Skill 中明确：

- 颜色优先使用现有 CSS 变量或 Tailwind 语义色（`bg-background`、`text-primary`）
- 禁止引入第二套调色板
- 新色必须先提案进全局样式，再使用

组件模板见 [前端 Skill](/insights/frontend-component-skill-template)。

# 亮暗色

若站点支持主题切换，组件验收应包含两种模式下的对比与边框可见性。无障碍对比见 [a11y](/insights/a11y-basics-for-ai-ui)。

# 间距与圆角

同样优先 spacing scale。允许的例外：一次性营销活动页，但应隔离，不污染基础组件库。

# 小结

设计 token 是给 AI 的轨道。轨道越清晰，生成 UI 越像同一产品。

下一步：在 Rules 加一条「颜色必须来自 token」并附文件路径。
