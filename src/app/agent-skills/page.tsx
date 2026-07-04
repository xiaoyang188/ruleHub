import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/catalog-sidebar";
import { PrimaryCtaLink } from "@/components/ui/site-chrome";
import { DocCodeBlock, DocH2, DocLink } from "@/components/docs/docs-layout";

export default function AgentSkillsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Breadcrumbs
        items={[
          { label: "Agent Skills 目录", href: "/skills" },
          { label: "Agent Skills 是什么？" },
        ]}
      />

      <header className="mx-auto max-w-3xl border-y border-border py-8 text-center">
        <p className="mb-2 text-sm font-medium text-primary">入门指南</p>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Agent Skills 是什么？</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Agent Skills 是以 SKILL.md 文件形式存在的模块化指令包，用于扩展 AI 编码助手在特定任务下的专业能力。
        </p>
        <div className="mt-8">
          <PrimaryCtaLink href="/skills">浏览 Agent Skills 目录</PrimaryCtaLink>
        </div>
      </header>

      <article className="mx-auto mt-12 max-w-3xl space-y-10 text-sm leading-relaxed text-muted-foreground">
        <section className="space-y-4">
          <DocH2>核心概念</DocH2>
          <p>
            每个 skill 通常包含 YAML frontmatter（名称、描述）以及面向 AI 的使用指南。Claude Code、Codex
            等工具会在任务匹配时自动加载相关 skill，无需用户手动触发 slash command。
          </p>
          <p>
            RuleHub 索引 GitHub 上公开仓库中的 SKILL.md 文件，提供搜索、分类、职业标签与创作者浏览能力。
          </p>
        </section>

        <section className="space-y-4">
          <DocH2>SKILL.md 示例</DocH2>
          <DocCodeBlock>{`---
name: code-reviewer
description: Thorough code review focusing on security and performance.
---

# Code Reviewer

Use when reviewing pull requests or auditing code quality.`}</DocCodeBlock>
        </section>

        <section className="space-y-4">
          <DocH2>平台专项目录</DocH2>
          <ul className="grid gap-3 sm:grid-cols-2">
            <li>
              <Link
                href="/claude-skills"
                className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
              >
                <span className="font-medium text-foreground group-hover:text-primary">
                  Claude Skills
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </Link>
            </li>
            <li>
              <Link
                href="/codex-skills"
                className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
              >
                <span className="font-medium text-foreground group-hover:text-primary">
                  Codex Skills
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </Link>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <DocH2>延伸阅读</DocH2>
          <p>
            阅读 <DocLink href="/docs/skill">Skill 文档</DocLink> 了解如何编写 skill，或查看{" "}
            <DocLink href="/docs/spec">Agent Skills 规范</DocLink>（agentskills.io）。
          </p>
        </section>
      </article>
    </div>
  );
}
