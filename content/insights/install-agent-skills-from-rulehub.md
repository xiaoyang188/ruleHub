---
title: 如何从 RuleHub 安装 Agent Skills？三种常用方式
description: 在 Claude Code、Codex 或 Cursor 中安装 Agent Skills 的完整步骤：插件命令、Prompt 辅助安装与手动复制。
author: RuleHub 编辑组
publishedAt: 2026-08-01
tags: Agent Skills, 安装, Claude Code, 入门
category: 教程
---

# 安装前：先检查来源

RuleHub 只做索引，不托管 skill 源码。安装前请打开 skill 详情页的 **文件资源管理器**，阅读 `SKILL.md` 与 `LICENSE.txt`，确认内容与许可证符合你的预期。

# 方式一：Claude Code 插件命令（推荐）

在 skill 详情页的 **安装 → 命令** 标签中，复制类似下面的命令：

```text
/plugin marketplace add author/repo
```

在 Claude Code 终端粘贴执行即可。该方式适合官方或已收录到 marketplace 的仓库。

# 方式二：用 Prompt 让 AI 帮你装

切换到 **安装 → Prompt**，复制整段 Prompt 到 Codex、Claude 或其他助手。Prompt 会引导 AI：

1. 打开 RuleHub 上的 skill 页面
2. 核对 `SKILL.md` 内容
3. 将 skill 目录复制到正确路径（个人或项目级）

适合不熟悉目录结构、希望 AI 逐步确认的新手。

# 方式三：手动下载 Zip

点击详情页 **下载 Zip**，获取 GitHub 仓库压缩包。解压后：

- **个人级**：复制 skill 文件夹到 `~/.claude/skills/`
- **项目级**：复制到项目根目录的 `.claude/skills/`

重启或刷新 AI 助手后即可加载。

# 安装后验证

- 在 Claude Code 中运行 `/skills` 或相关命令，确认 skill 出现在列表中
- 用一条与该 skill 领域相关的任务测试，观察 AI 是否引用了 `SKILL.md` 中的约束

# 常见问题

**Q：安装后 AI 好像没用到 skill？**  
A：检查 skill 名称与描述是否清晰；部分工具需要显式启用或重启会话。

**Q：可以同时装多个吗？**  
A：可以，参见 [如何挑选 Claude Skills](/insights/how-to-pick-claude-skills)。
