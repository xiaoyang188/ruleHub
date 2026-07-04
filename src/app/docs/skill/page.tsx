import { DocCodeBlock, DocH2, DocLink, DocsLayout } from "@/components/docs/docs-layout";
import { siteFeatures } from "@/lib/site-features";

export default function SkillDocsPage() {
  return (
    <DocsLayout
      title="Skill 文档"
      description="了解 SKILL.md 文件格式，创建并分享你的 Agent Skill。"
      breadcrumbs={[
        { label: "文档", href: "/docs" },
        { label: "Skill 文档" },
      ]}
    >
      <section className="space-y-4">
        <DocH2>文件结构</DocH2>
        <p>一个 skill 通常是一个目录，至少包含 SKILL.md：</p>
        <DocCodeBlock>{`my-skill/
├── SKILL.md
├── scripts/      # 可选
├── references/   # 可选
└── assets/       # 可选`}</DocCodeBlock>
      </section>

      <section className="space-y-4">
        <DocH2>Frontmatter</DocH2>
        <DocCodeBlock>{`---
name: my-skill
description: One-line description for skill discovery.
---

# My Skill

Detailed instructions for the AI agent...`}</DocCodeBlock>
      </section>

      {siteFeatures.showPublishDocs && (
        <section className="space-y-4">
          <DocH2>发布到 RuleHub</DocH2>
          <p>
            将 skill 推送到 GitHub 公开仓库后，索引会在下次同步时自动收录。详见{" "}
            <DocLink href="/docs/spec">Agent Skills 规范</DocLink>。
          </p>
        </section>
      )}
    </DocsLayout>
  );
}
