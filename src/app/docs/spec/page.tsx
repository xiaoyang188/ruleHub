import { DocH2, DocLink, DocsLayout } from "@/components/docs/docs-layout";

export default function SpecDocsPage() {
  return (
    <DocsLayout
      title="Agent Skills 规范"
      description="agentskills.io 定义的 SKILL.md 开放规范摘要。"
      breadcrumbs={[
        { label: "文档", href: "/docs" },
        { label: "规范" },
      ]}
    >
      <section className="space-y-4">
        <DocH2>规范要点</DocH2>
        <ul className="list-inside list-disc space-y-2">
          <li>每个 skill 必须包含 SKILL.md 与 YAML frontmatter</li>
          <li>name 与 description 用于 discovery 与自动匹配</li>
          <li>正文为 agent 可读的指令与约束</li>
          <li>可选 scripts、references、assets 目录扩展能力</li>
        </ul>
      </section>
      <section className="space-y-4">
        <DocH2>外部资源</DocH2>
        <p>
          完整规范见{" "}
          <DocLink href="https://agentskills.io" external>
            agentskills.io
          </DocLink>
          。编写指南见 <DocLink href="/docs/skill">Skill 文档</DocLink>。
        </p>
      </section>
    </DocsLayout>
  );
}
