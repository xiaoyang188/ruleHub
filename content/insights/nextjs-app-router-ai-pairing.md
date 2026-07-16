---
title: Next.js App Router 场景下的 AI 结对约定
description: 针对 App Router、Server Components 与 Route Handler，整理与 AI 协作时的目录约定、常见误区与验收要点。
author: RuleHub 编辑组
publishedAt: 2026-07-15
tags: Next.js, App Router, AI 编程, React
category: 实践指南
---

# 为什么 Next.js 特别容易被 AI「写旧」

训练语料里 Pages Router、`getServerSideProps`、客户端全家桶仍然大量存在。若不声明约束，模型会在 App Router 项目里生成过时模式，或把本该在服务端的逻辑塞进 `'use client'`。

# 建议写进 Rules 的基线

- 默认使用 App Router；禁止新建 `pages/` 路由（除非维护遗留）
- 优先 Server Components；仅在需要浏览器 API / 交互状态时加 `'use client'`
- 数据获取放在服务端组件或 Route Handler，避免在客户端组件直接持有密钥
- 元数据用 `metadata` / `generateMetadata`，不要只靠手写裸 `<title>` 应付 SEO

# 常见误区

## 1. 过早 `'use client'`

整页标成客户端，会失去服务端渲染与包体积优势。正确做法：把交互叶子组件客户端化，页面壳留在服务端。

## 2. 在客户端 fetch 本可用服务端完成的数据

除非需要用户态轮询或完全私有浏览器逻辑，优先服务端获取，减少瀑布与暴露内部 API。

## 3. 混淆 Route Handler 与 Server Action

两者都能写服务端逻辑。Skill 应写清团队偏好：表单突变用 Server Action，还是统一 REST Route。不要让模型每次随机选。

## 4. 忽略缓存与重校验语义

`fetch` 缓存、`revalidate`、动态渲染选项会影响线上行为。AI 常按「能显示」交付，人要核对是否需要实时数据。

# 结对时的对话拆分

推荐任务切片：

1. 路由与 `page.tsx` 骨架（无样式也可）
2. 数据获取与类型
3. 交互组件
4. metadata / SEO
5. 构建与基础无障碍检查

比「一次性做完整个功能」更容易审查。节奏原则见 [避免 AI 技术债](/insights/avoid-ai-tech-debt)。

# 验收清单

- `npm run build` 通过
- 无多余客户端边界
- 动态段 `generateStaticParams` / `notFound` 按需处理
- 错误与 loading UI 是否符合项目既有模式
- 安全项对照 [API 清单](/insights/api-route-security-checklist)（若涉及 Route）

# 与 RuleHub 的关联

RuleHub 本身基于 Next.js。洞察文章、搜索与 VibeCoding 页都依赖清晰的服务端/客户端边界。把约定写成 Skill，比每次口头提醒更稳。

可在 [搜索](/search) 中查找 `nextjs`、`app-router` 相关 Skills，合入前改成你们的目录（例如 `src/app`）。

# 小结

App Router 下的 AI 结对，核心是**默认服务端、客户端最小化、路由模式统一、缓存语义有人核对**。把这些写进 Rules 与脚手架 Skill，能显著减少「能跑但架构倒退」的提交。

下一步：检查仓库里最近三个 `'use client'` 文件，确认是否真的必须在客户端。
