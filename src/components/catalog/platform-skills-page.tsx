import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/catalog-sidebar";
import { CatalogSectionHeading } from "@/components/catalog/catalog-section";
import { SkillCard } from "@/components/home/skill-card";
import { PrimaryCtaLink } from "@/components/ui/site-chrome";
import type { Skill } from "@/data/mock";
import { FEATURED_SKILLS, STATS } from "@/data/mock";

export function PlatformSkillsPage({
  badge,
  title,
  description,
  breadcrumbLabel,
  skills,
  ctaHref,
  ctaLabel,
  docHref,
}: {
  badge: string;
  title: string;
  description: string;
  breadcrumbLabel: string;
  skills: Skill[];
  ctaHref: string;
  ctaLabel: string;
  docHref?: string;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Breadcrumbs items={[{ label: breadcrumbLabel }]} />

      <header className="mx-auto max-w-3xl border-y border-border py-8 text-center">
        <p className="mb-2 text-sm font-medium text-primary">{badge}</p>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          索引覆盖 {STATS.totalSkills} 条开源 Agent Skills
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <PrimaryCtaLink href={ctaHref}>{ctaLabel}</PrimaryCtaLink>
          {docHref && (
            <Link
              href={docHref}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3.5 text-sm font-semibold transition-colors hover:border-primary/50"
            >
              阅读文档
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </header>

      <section className="mt-12 space-y-6">
        <CatalogSectionHeading title="精选 skills" subtitle="来自 GitHub 的热门开源 skills" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark"
          >
            搜索更多 skills
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
