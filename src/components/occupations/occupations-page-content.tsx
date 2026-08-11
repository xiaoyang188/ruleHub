"use client";

import Link from "next/link";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { OccupationLeaf, OccupationSubGroup } from "@/data/occupations-tree";
import {
  OCCUPATION_MAJOR_GROUPS,
  OCCUPATIONS_PAGE_STATS,
} from "@/data/occupations-tree";
import { cn } from "@/lib/utils";

const INITIAL_VISIBLE = 3;

function OccupationPill({ item }: { item: OccupationLeaf }) {
  return (
    <Link
      href={item.href}
      className="inline-flex max-w-full items-center gap-2 rounded-lg border border-border bg-background/80 px-3 py-2 text-sm transition-colors hover:border-primary/45 hover:bg-muted/25"
    >
      <span className="text-foreground">{item.name}</span>
      <span className="shrink-0 text-xs text-muted-foreground">{item.count} 个 skills</span>
    </Link>
  );
}

function ExpandableOccupationPills({ items }: { items: OccupationLeaf[] }) {
  const [expanded, setExpanded] = useState(false);
  const hiddenCount = Math.max(0, items.length - INITIAL_VISIBLE);
  const visibleItems = expanded ? items : items.slice(0, INITIAL_VISIBLE);

  if (items.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {visibleItems.map((item) => (
        <OccupationPill key={item.id} item={item} />
      ))}
      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="inline-flex items-center gap-1 rounded-lg border border-dashed border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          {expanded ? "收起" : `再显示 ${hiddenCount} 个职业`}
          <ChevronDown
            className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")}
          />
        </button>
      )}
    </div>
  );
}

function SubGroupBlock({ subgroup }: { subgroup: OccupationSubGroup }) {
  return (
    <div className="border-t border-border/70 px-4 py-4 first:border-t-0">
      <Link
        href={subgroup.href}
        className="group flex items-start justify-between gap-3 transition-colors hover:text-primary"
      >
        <div className="min-w-0">
          <p className="font-medium text-foreground group-hover:text-primary">{subgroup.name}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">SOC {subgroup.socCode}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
          <span>{subgroup.count} 个 skills</span>
          <ChevronRight className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
      </Link>
      {subgroup.children.length > 0 && (
        <div className="mt-3">
          <ExpandableOccupationPills items={subgroup.children} />
        </div>
      )}
    </div>
  );
}

export function OccupationsPageContent() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return OCCUPATION_MAJOR_GROUPS;

    return OCCUPATION_MAJOR_GROUPS.filter((group) => {
      if (group.name.toLowerCase().includes(q) || group.socCode.includes(q)) return true;
      return group.subgroups.some(
        (sub) =>
          sub.name.toLowerCase().includes(q) ||
          sub.socCode.includes(q) ||
          sub.children.some((child) => child.name.toLowerCase().includes(q))
      );
    });
  }, [query]);

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
            <span className="text-foreground">按职业浏览 Agent Skills</span>
          </li>
        </ol>
      </nav>

      <header className="mb-8 max-w-4xl">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">按职业浏览 Agent Skills</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {OCCUPATIONS_PAGE_STATS.majorGroups} 个主要职业组 ·{" "}
          {OCCUPATIONS_PAGE_STATS.socPositions} 个 SOC 职位
        </p>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          按美国劳工部 SOC 标准，查找各职业对应的 Agent Skills、自动化能力和工作流技能。
        </p>
        <p className="mt-4 text-xs leading-5 text-muted-foreground">
          目录共 {OCCUPATIONS_PAGE_STATS.totalSkills} 个 skills，据估算，约{" "}
          {OCCUPATIONS_PAGE_STATS.classifiedPercent}% 已映射到至少一个 SOC 职业。
        </p>
        <p className="mt-2 text-xs leading-5 text-muted-foreground/80">
          该估算由各职业的 skill 数量汇总得出；同一 skill 如映射到多个职业，可能会被重复计数。它不代表质量评级、安全检查或职业建议。
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          <a
            href="https://www.bls.gov/soc/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            数据来源：美国劳工部标准职业分类（SOC）
          </a>
        </p>
      </header>

      <div className="mb-8 max-w-xl">
        <label htmlFor="occupation-search" className="mb-2 block text-xs font-medium text-muted-foreground">
          搜索 SOC 职业
        </label>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            id="occupation-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            placeholder="搜索职业…"
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <span className="shrink-0 rounded border border-border px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
            SOC
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((group) => (
          <section
            key={group.id}
            className="overflow-hidden rounded-xl border border-border bg-card"
          >
            <Link
              href={group.href}
              className="group flex items-center justify-between gap-4 border-b border-border bg-muted/20 px-4 py-4 transition-colors hover:bg-muted/30 sm:px-5"
            >
              <div className="min-w-0">
                <h2 className="text-base font-semibold text-foreground group-hover:text-primary sm:text-lg">
                  {group.name}
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">SOC {group.socCode}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2 text-sm text-muted-foreground">
                <span>{group.count} 个 skills</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
            </Link>

            <div>
              {group.subgroups.map((subgroup) => (
                <SubGroupBlock key={subgroup.id} subgroup={subgroup} />
              ))}
            </div>
          </section>
        ))}

        {filtered.length === 0 && (
          <p className="rounded-xl border border-border bg-card px-4 py-8 text-center text-sm text-muted-foreground">
            未找到匹配的职业，请换个关键词试试。
          </p>
        )}
      </div>
    </div>
  );
}
