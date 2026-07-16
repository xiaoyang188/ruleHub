---
title: 依赖升级与 AI：改 package.json 前后的检查表
description: 给出在 AI 协助升级 npm/pnpm 依赖时的风险分层、验证步骤与回滚策略，降低「升级后全红」的概率。
author: RuleHub 编辑组
publishedAt: 2026-07-16
tags: 依赖管理, npm, 升级, AI 编程
category: 实践指南
---

# 升级为什么容易翻车

模型会乐观地改版本号与 import，却不一定理解 breaking change、peer dependency 或锁定文件语义。一次「顺便升级全部」往往变成周末救火。

# 风险分层

- **补丁级**：相对安全，仍需测试
- **次版本**：看 changelog
- **主版本 / 框架级**（Next、React）：单独 PR，禁止夹带功能

# AI 可做

- 汇总 changelog 疑点（要求带来源，见 [调研笔记法](/insights/ai-research-note-method)）
- 按你指定的范围改版本并尝试修类型错误
- 列出可能的破坏点清单

# 人必须做

- 决定升级范围与窗口
- 阅读框架迁移文档关键节
- 确认锁文件策略（提交锁文件的仓库不要让模型随意删锁）

# 检查表

1. 单独分支与可回滚 commit  
2. 先升级非框架依赖，再升框架  
3. `install` → `lint` → `test` → `build`  
4. 冒烟主路径  
5. 更新 README 中的版本说明（[面向 AI 的 README](/insights/readme-for-ai-agents)）

# 反模式

- 一次 PR 里升级一切并重写功能
- 为通过构建而删除测试
- 提交含密钥的本地 `.npmrc`

# 小结

依赖升级是受控变更，不是灵感创作。AI 适合加速修改与扫尾，人适合控制范围与验收。

下一步：把「框架主版本单独 PR」写进仓库 Rules。
