---
title: 环境变量与密钥：AI 辅助开发中的防泄漏实践
description: 归纳 .env 管理、示例文件、日志脱敏与 Code Review 关注点，降低 AI 会话与提交中的密钥泄漏风险。
author: RuleHub 编辑组
publishedAt: 2026-07-16
tags: 安全, 环境变量, 密钥, 最佳实践
category: 实践指南
---

# 泄漏常常不是黑客攻击，而是提交与粘贴

AI 编程场景下，密钥泄漏的常见路径是：模型把 `.env` 内容写进代码、开发者把报错连同密钥贴进聊天、示例配置含真实值被推送到 GitHub。防护要前移到工作流，而不是事后轮换手忙脚乱。

# 仓库约定

- 真实密钥只存在本机 / 密钥管理服务，从不入库
- 提供 `.env.example`，只含变量名与假值
- `.gitignore` 明确忽略 `.env`、`.env.local` 等
- 文档中演示用明显假值，如 `sk_test_xxx`

把「禁止提交密钥」写进 Rules，并把检查步骤写进相关 Skill 反模式。参见 [反模式指南](/insights/skill-anti-patterns-guide)。

# 与 AI 对话时

- 不要粘贴完整 `.env`
- 需要讨论配置时，只给变量名与类型（字符串/URL）
- 若模型输出疑似密钥，立刻轮换并检查 git 历史

# 代码层注意

- 前端打包只能暴露显式允许的 `NEXT_PUBLIC_*`
- 服务端密钥不可传入客户端组件 props「图方便」
- 日志中间件默认脱敏 Authorization、cookie、password 字段

API 场景更多条目见 [API 安全清单](/insights/api-route-security-checklist)。

# Review 清单（可勾选）

- diff 中是否出现长随机串、私钥头、云厂商密钥形态
- 是否新增环境变量但未更新 `.env.example` 与文档
- 错误响应是否回显配置内容

# 泄漏后的动作

1. 立即在提供商控制台作废并轮换
2. 从 git 历史清除（必要时视为已公开）
3. 检查访问日志是否有异常调用
4. 复盘：哪条 Rule / CI 检查缺失，补上

# 小结

密钥安全在 AI 时代更依赖流程：示例与真实分离、对话脱敏、Rules 禁止、Review 扫一眼、泄漏即轮换。工具再聪明，也不能替你保管生产密钥。

下一步：确认仓库有 `.env.example` 且 CI 或 pre-commit 能拦截常见密钥形态。
