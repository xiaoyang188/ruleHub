---
title: 如何建设团队 Agent Skills 库：从个人实验到可治理资产
description: 给出团队 Skills 库的目录结构、评审流程、版本策略与废弃机制，避免「人人一份 Prompt」导致的混乱。
author: RuleHub 编辑组
publishedAt: 2026-07-10
tags: Agent Skills, 团队协作, 治理, 最佳实践
category: 实践指南
---

# 问题：个人有效，团队失效

个人用 AI 写代码很快；团队一起用时，却常出现：每人私藏一套 Prompt、同名 Skill 行为不一致、新人不知道该加载哪个。结果是速度上去了，可维护性下来了。

建设**团队 Skills 库**的目标，是把个人经验变成可版本管理、可审计、可淘汰的共享资产。

# 库的定位

Skills 库不是博客，也不是 Wiki 全文镜像。它应该是：

- 可被 AI 直接读取的操作说明（多为 `SKILL.md`）
- 与仓库技术栈强绑定
- 有明确维护者与验证日期

可以在 [RuleHub](/) 发现外部优质 Skills，再 Fork 进内部库本地化——外部索引负责发现，内部库负责落地。

# 推荐目录结构

一个可复制的起点：

- `skills/engineering/`：lint、commit、PR、发布清单
- `skills/scaffold/`：组件、API、migration 脚手架
- `skills/domain/`：业务专项（支付、权限、报表）
- `skills/REVIEW.md`：评审标准
- `skills/CATALOG.md`：索引表（名称、适用栈、维护者、上次验证）

每个 Skill 一个文件夹，内含 `SKILL.md` 与可选 `examples/`。

# 准入与评审

## 准入门槛

新 Skill 合入前至少满足：

- 有触发条件与反模式（见 [格式指南](/insights/skill-md-format-guide)）
- 在沙箱仓库完成 2 次真实任务验证
- 指定维护者（个人或小组）
- 与现有 Rules / CI 不冲突

## 评审关注点

- 是否过度绑定个人机器路径
- 是否要求访问敏感环境变量
- 是否与另一 Skill 职责重叠（重叠则合并或拆分）

# 版本与兼容

对破坏性变更（例如目录约定大改）：

1. 升主版本或在文件名标明 `v2`
2. 旧 Skill 标记 `deprecated` 并给出迁移链接
3. 给团队 2 周缓冲期再删除

把 Skills 当依赖管理：没有废弃策略，库会迅速变成坟场。

# 使用规范

## 会话开始时的加载原则

- 一次任务加载 **1～3 个** Skill，避免上下文打架
- 优先加载与当前改动路径相关的 Skill
- 全局底线放 Rules，不要每个 Skill 重复抄一遍

## 反馈闭环

若 Skill 导致返工，在文件顶部「已知问题」追加一条，并开 Issue。沉默弃用是最差结果——别人会继续踩坑。

# 与 RuleHub、职业分类的关系

RuleHub 的 [创作者](/creators) 与 [职业技能](/occupations) 适合做「外部灵感源」。团队库则应更窄、更本地。推荐流程：

1. 在 RuleHub 检索候选
2. 按 [选型三步法](/insights/how-to-pick-claude-skills) 评估
3. 本地化后合入内部 `skills/`
4. 在 `CATALOG.md` 登记来源链接与差异说明

# 度量：怎样算建设成功？

不必追求 Skill 数量。更有用的指标：

- 新人 onboarding 第一周能否独立使用 3 个核心 Skill
- 重复返工类 Issue 是否下降
- 过期 Skill（超过 90 天未验证）占比是否可控

# 小结

团队 Skills 库的关键不是「收集更多文件」，而是**治理**：目录清晰、评审准入、版本迁移、使用纪律与反馈闭环。做好这五件事，AI 编程才能从个人魔法变成组织能力。

可执行下一步：本周创建 `skills/CATALOG.md`，把现有私有 Prompt 整理进三类目录，并为每个文件指定维护者。
