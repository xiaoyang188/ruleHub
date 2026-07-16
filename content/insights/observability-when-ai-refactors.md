---
title: 日志与可观测性：AI 改代码时别把眼睛挖掉
description: 强调在 AI 重构中保留关键日志、请求 ID 与错误上报埋点，并给出可写进 Skill 的保留清单。
author: RuleHub 编辑组
publishedAt: 2026-07-16
tags: 日志, 可观测性, 重构, AI 编程
category: 实践指南
---

# 重构常误伤的是「看不见的代码」

模型清理「冗余」时，可能删掉你认为啰嗦、但线上救命的日志与埋点。功能测试仍绿，故障时却无线索。

# 默认保留清单

- 请求 ID / 链路 ID 传递
- 授权失败与校验失败的结构化日志（脱敏）
- 支付、删除、权限变更等审计点
- 对外 API 的状态码与延迟指标钩子
- 前端关键 CTA 的分析事件（若产品依赖）

把「禁止无说明删除日志与埋点」写入反模式，见 [反模式指南](/insights/skill-anti-patterns-guide)。

# 与 AI 对话时明示

「可以整理日志格式，但不得减少审计事件；改动需在 PR 说明。」

Code Review 模板也可加一条可观测性检查，参考 [AI Review](/insights/ai-code-review-checklist)。

# 脱敏再强调

日志是泄漏温床。token、cookie、密码、身份证号不得落盘。参见 [密钥实践](/insights/env-secrets-ai-safety)。

# 小结

可观测性是生产友谊的基础设施。AI 加速重构时，人要用清单保护「眼睛」。

下一步：给最关键的写操作打一份「现有日志点」快照，升级或重构时做 diff 对照。
