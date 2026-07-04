"use client";

import Link from "next/link";
import { Briefcase, ChevronRight } from "lucide-react";
import { BrowseSkillsPanel } from "@/components/browse/browse-skills-panel";
import { getSkillsForOccupation } from "@/data/detail";
import type { Occupation } from "@/data/mock";
import { OCCUPATION_GROUP_CARDS } from "@/data/occupations-page";

export function OccupationDetailView({ occupation }: { occupation: Occupation }) {
  const skills = getSkillsForOccupation(occupation.id);
  const groupMeta = OCCUPATION_GROUP_CARDS.find((g) => g.id === occupation.id);
  const childCount = groupMeta?.children.length ?? 0;
  const socCode = groupMeta?.socCode ?? "00-0000";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="transition-colors hover:text-foreground">
              首页
            </Link>
          </li>
          <li className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            <Link href="/occupations" className="transition-colors hover:text-foreground">
              职业技能
            </Link>
          </li>
          <li className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            <span className="text-foreground">{occupation.name}</span>
          </li>
        </ol>
      </nav>

      <header className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <Briefcase className="h-8 w-8 text-primary" aria-hidden />
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{occupation.name}</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          {childCount} 个职业组 · 职业技能 · SOC {socCode} · {occupation.count} 个 skills
        </p>
      </header>

      <BrowseSkillsPanel
        skills={skills}
        occupationId={occupation.id}
        searchPlaceholder={`搜索 ${occupation.name} 中的 skills...`}
      />
    </div>
  );
}
