import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/catalog-sidebar";
import { PrimaryCtaLink } from "@/components/ui/site-chrome";

const DOC_LINKS = [
  { href: "/docs/api", label: "API 文档", desc: "REST API 接入与配额说明" },
  { href: "/docs/skill", label: "Skill 文档", desc: "SKILL.md 编写指南" },
  { href: "/docs/faq", label: "FAQ", desc: "常见问题与安装说明" },
  { href: "/docs/official", label: "官方 Skills", desc: "知名团队仓库索引" },
  { href: "/docs/codex", label: "Codex Skills", desc: "Codex 平台说明" },
  { href: "/docs/spec", label: "Agent Skills 规范", desc: "agentskills.io 摘要" },
  { href: "/developers", label: "开发者门户", desc: "OpenAPI / MCP 接入" },
];

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Breadcrumbs items={[{ label: "文档" }]} />

      <header className="mx-auto max-w-3xl border-y border-border py-8 text-center">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">文档</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
          RuleHub 使用说明、API 与 Agent Skills 规范
        </p>
        <div className="mt-8">
          <PrimaryCtaLink href="/docs/api">查看 API 文档</PrimaryCtaLink>
        </div>
      </header>

      <ul className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
        {DOC_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group flex h-full flex-col rounded-xl border border-border bg-card px-5 py-4 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <span className="font-medium text-foreground group-hover:text-primary">
                {link.label}
              </span>
              <span className="mt-1 flex-1 text-sm text-muted-foreground">{link.desc}</span>
              <ArrowRight className="mt-3 h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
