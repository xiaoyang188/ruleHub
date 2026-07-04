import { DocH2, DocLink, DocsLayout } from "@/components/docs/docs-layout";

const OFFICIAL_REPOS = [
  { author: "anthropics", repo: "anthropics/skills", desc: "Anthropic 官方 skills 集合" },
  { author: "obra", repo: "obra/superpowers", desc: "Superpowers 工作流 skills" },
  { author: "vercel-labs", repo: "vercel-labs/agent-skills", desc: "Vercel 工程最佳实践" },
];

export default function OfficialSkillsPage() {
  return (
    <DocsLayout
      title="官方 Skills"
      description="来自知名团队与组织的官方或半官方 Agent Skills 仓库索引。"
      breadcrumbs={[
        { label: "文档", href: "/docs" },
        { label: "官方 Skills" },
      ]}
    >
      <section className="space-y-4">
        <DocH2>推荐仓库</DocH2>
        <ul className="space-y-3">
          {OFFICIAL_REPOS.map((item) => (
            <li
              key={item.repo}
              className="rounded-xl border border-border bg-card p-4"
            >
              <DocLink href={`/creators/${item.author}`}>{item.repo}</DocLink>
              <p className="mt-1 text-xs">{item.desc}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="space-y-4">
        <DocH2>浏览更多</DocH2>
        <p>
          在 <DocLink href="/creators">创作者目录</DocLink> 或{" "}
          <DocLink href="/search">搜索页</DocLink> 发现更多开源 skills。
        </p>
      </section>
    </DocsLayout>
  );
}
