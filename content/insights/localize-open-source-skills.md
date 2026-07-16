---
title: 开源 Skill 本地化改造清单：Fork 之后必改的十处
description: 列出从 GitHub 或 RuleHub 发现 Skills 后，合入自有仓库前必须替换的路径、命令、安全与文档项。
author: RuleHub 编辑组
publishedAt: 2026-07-16
tags: Fork, 本地化, Agent Skills, 清单
category: 实践指南
---

# Fork 不是结束，是开始

直接加载别人的 Skill，失败率很高：路径不同、包管理器不同、鉴权体系不同。本地化是把外部智慧变成内部资产的必要步骤。发现与评估见 [评估 GitHub Skills](/insights/evaluate-github-skills)。

# 十处必改

1. **包管理器与脚本**：`npm` / `pnpm` / `yarn` 与真实 `package.json` scripts  
2. **源码根目录**：`src/`、`app/`、`apps/web` 等  
3. **测试命令与目录**  
4. **鉴权与用户模型假设**  
5. **云厂商与部署命令**  
6. **代码风格**：与仓库 Lint / Rules 对齐  
7. **许可证与来源注释**（顶部注明 upstream）  
8. **反模式**：补上你们的合规红线  
9. **示例**：换成你们的真实模块名  
10. **维护者与验证日期**（写入团队目录）

# 改造流程

1. 复制到 `skills/` 新文件夹，不要直接改 submodule 除非有意跟踪 upstream  
2. 全文搜索对方特有路径并替换  
3. 冷启动试跑一次  
4. PR 说明「来源 + 差异」  
5. 登记 [团队库](/insights/team-skills-library) 目录

# 何时该放弃本地化

- 与栈差异过大，改写成本接近重写
- 安全模型不透明
- 许可证不允许你们的分发方式

此时更适合只吸收思路，自己按 [90 分钟路线图](/insights/write-first-skill-md-90min) 重写。

# 小结

本地化清单让 Fork 可审计、可维护。完成十处修改并试跑，才算真正「拥有」这条 Skill。

下一步：把清单贴进 `skills/REVIEW.md`，作为合入检查表。
