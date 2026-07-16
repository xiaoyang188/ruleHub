---
title: 前端组件脚手架 Skill 模板：统一 React 组件产出质量
description: 提供一套可复用的前端组件 Skill 大纲，覆盖目录、Props、无障碍、样式约束与验收标准，减少 AI 生成组件的风格漂移。
author: RuleHub 编辑组
publishedAt: 2026-07-11
tags: React, 组件, Skill 模板, 前端
category: 教程
---

# 为什么组件也需要 Skill？

同一团队里，AI 今天生成带默认导出的函数组件，明天又写出 class；有的用 `any`，有的忽略 `aria-*`。没有脚手架 Skill，UI 层会在几周内变得难以搜索与重构。

本文给出一份**可直接改写成 `SKILL.md` 的模板大纲**，适合 React + TypeScript 项目。你可按需替换目录名与样式方案。

# Skill 元信息建议

- 名称：`react-component-scaffold`
- 适用：新建展示型 / 轻交互组件
- 不适用：复杂状态机页面、数据获取容器（另建 Skill）

# 触发条件

## 应当启用

- 用户要求「新建一个 Button / Card / EmptyState 类组件」
- 需要与现有 `src/components/ui` 风格对齐

## 不应启用

- 大改业务页面布局（先规划再拆组件）
- 引入全新 UI 库（需先人工选型）

# 分步流程（可粘贴进 Skill）

1. 确认组件名（PascalCase）与放置路径，例如 `src/components/ui/{name}.tsx`
2. 先搜索仓库是否已有同名或近似组件，避免重复
3. 使用函数组件 + 显式 Props 类型，禁止 `any`
4. 样式遵循项目现有方案（如 Tailwind utility），不引入新的 CSS 方法论
5. 交互组件必须可键盘操作；图标按钮提供 `aria-label`
6. 导出方式与目录内既有组件一致（具名导出或默认导出二选一，跟仓库）
7. 若项目有 Story / 简易用法注释，按现有惯例补充
8. 完成后列出改动文件，并说明如何在页面中引用

# 输出标准（Definition of Done）

- 类型检查通过，无新增 `eslint-disable` 除非有注释理由
- Props 有合理默认值或明确必填
- 空状态、加载态若适用已处理，或明确标注由调用方处理
- 未引入未声明依赖

# 反模式

- 在组件内直接 `fetch` 业务数据（应上提或用专用数据层）
- 硬编码品牌色魔法数字（应使用设计 token / CSS 变量）
- 为「好看」包一层无意义的卡片容器（交互不需要则不要卡片）
- 复制第三方组件库大段源码却不说明许可证

# 示例：空状态组件要点

一个 `EmptyState` 至少包含：标题、简短说明、可选操作按钮插槽。AI 常会堆图标与装饰；Skill 应要求**信息层级清晰、移动端可读**，与 RuleHub 前端设计原则一致：少装饰、一节一事。

# 如何演进这份模板

- 把团队真实踩坑写进反模式（比空泛原则有用）
- 与 [Cursor Rules](/insights/cursor-rules-writing-guide) 交叉引用：Rules 写全局，Skill 写脚手架步骤
- 在 [团队 Skills 库](/insights/team-skills-library) 中登记维护者

可在 [RuleHub](/search) 搜索 `react`、`component`、`ui` 相关 Skills 作对照，但合入前必须改成你们的路径与导出约定。

# 小结

前端组件 Skill 的价值是**收敛自由度**：同一问题多次生成，结果仍落在团队可维护的集合里。用触发条件、步骤、DoD、反模式四段式，就能把「帮我写个组件」变成稳定产出。

下一步：复制本文结构到仓库 `skills/scaffold/react-component/SKILL.md`，用一次真实新建组件任务跑通并修订。
