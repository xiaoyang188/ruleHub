import Link from "next/link";
import { ArrowRight, Folder } from "lucide-react";
import { Breadcrumbs, CatalogSidebar } from "@/components/layout/catalog-sidebar";
import { CatalogLinkCard, CatalogSectionHeading } from "@/components/catalog/catalog-section";
import { SkillCard } from "@/components/home/skill-card";
import { PrimaryCtaLink } from "@/components/ui/site-chrome";
import {
  CATALOG_STATS,
  CATEGORY_DOMAINS,
  DIRECTORY_CARDS,
  PLATFORM_CARDS,
  SUB_CATEGORIES,
} from "@/data/catalog";
import { FEATURED_SKILLS, OCCUPATIONS, STATS } from "@/data/mock";
import { getFeaturedSkills } from "@/lib/skillsmp-api";

const MAX_OCCUPATION_COUNT = 1_265_857;

function getBarWidth(count: string) {
  const value = Number(count.replace(/,/g, ""));
  return Math.max(8, Math.round((value / MAX_OCCUPATION_COUNT) * 100));
}

export default async function SkillsPage() {
  const hotSkills = await getFeaturedSkills(6);
  const displaySkills = hotSkills.length > 0 ? hotSkills : FEATURED_SKILLS.slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Breadcrumbs items={[{ label: "Agent Skills 目录" }]} />

      <header className="mx-auto max-w-3xl border-y border-border py-8 text-center">
        <p className="mb-2 text-sm font-medium text-primary">目录入口</p>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Agent Skills 目录</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          先按职业和工作场景进入，再按任务、创作者、仓库或分类细分；如果已经知道关键词、仓库或作者，可以直接搜索。
        </p>

        <dl className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
          <div>
            <dt className="text-muted-foreground">skills</dt>
            <dd className="text-lg font-semibold tabular-nums text-foreground">
              {STATS.totalSkills}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">职业</dt>
            <dd className="text-lg font-semibold tabular-nums text-foreground">
              {STATS.occupationGroups}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">创作者</dt>
            <dd className="text-lg font-semibold tabular-nums text-foreground">
              {CATALOG_STATS.creators}
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <PrimaryCtaLink href="/search">去搜索</PrimaryCtaLink>
          <Link
            href="/occupations"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/50"
          >
            职业
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <div className="mt-12 flex gap-10 lg:mt-14">
        <CatalogSidebar />

        <main className="min-w-0 flex-1 space-y-16">
          <section id="occupations" className="scroll-mt-28 space-y-6">
            <CatalogSectionHeading
              title="按职业浏览"
              subtitle="按美国劳工部 SOC 标准，查找各职业对应的 Agent Skills、自动化能力和工作流技能。"
              action={{ href: "/occupations", label: "查看全部职业" }}
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {OCCUPATIONS.map((occupation) => (
                <Link
                  key={occupation.id}
                  href={`/occupations/${occupation.id}`}
                  className="group flex h-[152px] flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
                >
                  <span className="text-[10px] font-semibold tracking-wider text-muted-foreground">
                    #{occupation.rank}
                  </span>
                  <h3 className="flex-1 text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
                    {occupation.name}
                  </h3>
                  <div className="space-y-1.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs tabular-nums text-muted-foreground">
                        {occupation.count}
                      </span>
                      <span className="text-[10px] text-muted-foreground">个技能</span>
                    </div>
                    <div className="h-px overflow-hidden rounded-full bg-border">
                      <div
                        className="h-full rounded-full bg-primary/35 transition-all group-hover:bg-primary/60"
                        style={{ width: `${getBarWidth(occupation.count)}%` }}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <CatalogSectionHeading
              title="专项 Agent Skills 页面"
              subtitle="这些页面先只说明 Claude、Codex 这两个明确平台词的工作流边界，真实 skills 仍然回到统一目录里判断。"
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {PLATFORM_CARDS.map((card) => (
                <CatalogLinkCard key={card.href} card={card} />
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <CatalogSectionHeading
              title="Browse RuleHub directories"
              subtitle="从职业、搜索、创作者与分类等入口继续探索"
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {DIRECTORY_CARDS.map((card) => (
                <CatalogLinkCard key={card.href} card={card} />
              ))}
            </div>
          </section>

          <section id="categories" className="scroll-mt-28 space-y-8">
            <CatalogSectionHeading
              title="按分类浏览"
              subtitle="从领域与子分类进入，按任务类型继续细分 skills。"
              action={{ href: "/categories", label: "查看全部分类" }}
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {CATEGORY_DOMAINS.map((domain) => (
                <Link
                  key={domain.id}
                  href={`/categories/${domain.id}`}
                  className="group flex items-center justify-between rounded-xl border border-border bg-card px-4 py-4 transition-all hover:border-primary/40"
                >
                  <div>
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary">
                      {domain.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {domain.count} skills · {domain.subCount} 子分类
                    </p>
                  </div>
                  <Folder className="h-4 w-4 text-muted-foreground opacity-40 group-hover:text-primary group-hover:opacity-100" />
                </Link>
              ))}
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">热门子分类</h3>
              <div className="flex flex-wrap gap-2">
                {SUB_CATEGORIES.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/categories/${sub.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs transition-colors hover:border-primary/50"
                  >
                    <span className="font-medium text-foreground">{sub.name}</span>
                    <span className="text-muted-foreground">{sub.count}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section id="hot-skills" className="scroll-mt-28 space-y-6">
            <CatalogSectionHeading
              title="热门 skills"
              subtitle={`这里先列出 ${CATALOG_STATS.hotSkillsListed} 个热门 skills；全库共有 ${STATS.totalSkills} 个，更多结果可以用搜索查找。`}
              action={{ href: "/search?sort=stars", label: "继续浏览热门 skills" }}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {displaySkills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} openInNewTab />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
