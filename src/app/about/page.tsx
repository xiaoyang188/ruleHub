import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/catalog-sidebar";
import { PrimaryCtaLink } from "@/components/ui/site-chrome";
import { STATS } from "@/data/mock";
import { createPageMetadata } from "@/lib/site-seo";

export const metadata = createPageMetadata({
  title: "关于 RuleHub",
  description: "了解 RuleHub — 独立 Agent Skills 市场与 AI 编程灵感聚合站。",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Breadcrumbs items={[{ label: "关于我们" }]} />

      <header className="mx-auto max-w-3xl border-y border-border py-8 text-center">
        <p className="mb-2 text-sm font-medium text-primary">独立社区项目</p>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">关于 RuleHub</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          RuleHub 是 Agent Skills 的发现与浏览平台，索引 GitHub 上公开的 SKILL.md 文件，帮助开发者找到可安装的
          Claude Skills、Codex Skills 与通用 agent 能力包。
        </p>
      </header>

      <article className="mx-auto mt-12 max-w-3xl space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">我们做什么</h2>
          <p>
            我们从 GitHub 采集符合 SKILL.md 规范的开源 skills，提供搜索、分类、职业标签与创作者浏览。当前索引覆盖{" "}
            {STATS.totalSkills} 条 skills，约 {STATS.classifiedPercent}% 已完成分类。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">免责声明</h2>
          <p>
            RuleHub 与 Anthropic、OpenAI 或任何 AI 公司均无关联。所有 skills 来自第三方公开仓库，安装前请自行审查代码。
          </p>
        </section>

        <section className="flex flex-wrap gap-3 pt-4">
          <PrimaryCtaLink href="/skills">浏览目录</PrimaryCtaLink>
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3.5 text-sm font-semibold transition-colors hover:border-primary/50"
          >
            阅读文档
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </article>
    </div>
  );
}
