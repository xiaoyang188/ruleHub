# 洞察专栏 · 文章发布指南

本目录存放 RuleHub **原创深度文章**（Markdown），用于 AdSense 合规与 SEO 长尾流量。

## 新增一篇文章

1. 在本目录新建 `your-slug.md`（slug 使用小写英文与连字符）
2. 填写 front matter 并撰写正文（建议 **800～1500 字以上** 中文）
3. 本地 `npm run build` 验证
4. 部署后提交 sitemap 至 Google Search Console

## Front Matter 模板

```yaml
---
title: 文章标题
description: 120～160 字的摘要，会用于 SEO 与列表卡片
author: RuleHub 编辑组
publishedAt: 2026-07-09
updatedAt: 2026-07-10
tags: 标签1, 标签2, 标签3
category: 教程
---
```

## 正文格式

支持简易 Markdown：

- `#` / `##` / `###` 标题
- `-` 无序列表
- `**粗体**`、`` `代码` ``、`[链接文字](/path)` 或外链

## 路由与收录

- 列表页：`/insights`
- 详情页：`/insights/[slug]`
- 自动进入 `sitemap.xml`

## AdSense 目标

Google 常要求站点具备足够数量的**原创、有价值**长文。建议逐步积累 **20～30 篇**，主题围绕 Agent Skills、AI 编程实践、工具评测与教程，避免采集或纯短讯。

## 质量建议

- 每篇解决一个明确问题，文末给出可执行下一步
- 适当内链至 RuleHub 功能页（搜索、VibeCoding、文档等）
- 发布前通读一遍，确保事实准确、无夸大宣传
