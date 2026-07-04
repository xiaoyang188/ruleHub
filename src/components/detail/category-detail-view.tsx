"use client";

import Link from "next/link";
import { ChevronRight, Wrench } from "lucide-react";
import { BrowseSkillsPanel } from "@/components/browse/browse-skills-panel";
import { CATEGORY_DESCRIPTIONS } from "@/data/categories-page";
import { getSkillsForCategory } from "@/data/detail";

export function CategoryDetailView({
  slug,
  name,
  count,
}: {
  slug: string;
  name: string;
  count: string;
}) {
  const fallbackSkills = getSkillsForCategory(slug);
  const description =
    CATEGORY_DESCRIPTIONS[slug] ??
    `浏览 ${name} 分类下的 Agent Skills，索引覆盖 ${count} 条 skills。`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2.5">
          <li>
            <Link href="/" className="transition-colors hover:text-primary">
              首页
            </Link>
          </li>
          <li aria-hidden>
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li>
            <Link
              href="/categories"
              className="transition-colors hover:text-primary"
            >
              分类
            </Link>
          </li>
          <li aria-hidden>
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li>
            <span className="font-medium text-foreground">{slug}</span>
          </li>
        </ol>
      </nav>

      <div className="mb-12">
        <div className="mb-6 flex items-center gap-4">
          <div className="text-cyan-600 dark:text-cyan-400">
            <Wrench className="h-12 w-12" aria-hidden />
          </div>
          <h1 className="text-4xl font-bold capitalize text-foreground">{name}</h1>
        </div>
        <div className="mb-6 max-w-4xl">
          <p className="text-base leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </div>

      <BrowseSkillsPanel
        skills={fallbackSkills}
        categorySlug={slug}
        searchPlaceholder={`在 ${name} 中搜索...`}
      />
    </div>
  );
}
