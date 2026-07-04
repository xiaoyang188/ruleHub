"use client";

import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { OCCUPATION_GROUP_CARDS } from "@/data/occupations-page";
import { STATS } from "@/data/mock";

export function OccupationsPageContent() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return OCCUPATION_GROUP_CARDS;
    return OCCUPATION_GROUP_CARDS.filter(
      (group) =>
        group.name.toLowerCase().includes(q) ||
        group.children.some((child) => child.name.toLowerCase().includes(q))
    );
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

      <header className="mb-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">按职业浏览 Agent Skills</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
          按美国劳工部 SOC 标准浏览 {STATS.occupationGroups} 个主要职业组、{STATS.socPositions}{" "}
          个 SOC 职位，查找各职业对应的 Agent Skills。
        </p>
      </header>

      <div className="mb-8 flex min-w-0 items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 md:max-w-md">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          aria-label="搜索职业…"
          placeholder="搜索职业…"
          className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="space-y-4">
        {filtered.map((group) => (
          <div
            key={group.id}
            className={`overflow-hidden rounded-xl border border-border border-l-4 bg-card ${group.borderClass}`}
          >
            <Link
              href={`/occupations/${group.id}`}
              className="group flex w-full items-center justify-between bg-background/70 px-4 py-3.5 backdrop-blur-sm transition-colors hover:bg-background/90"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="shrink-0 text-[10px] font-semibold tracking-wider text-muted-foreground/40">
                  #{group.rank}
                </span>
                <h2 className="truncate font-semibold text-foreground transition-colors group-hover:text-primary">
                  {group.name}
                </h2>
              </div>
              <div className="ml-3 flex shrink-0 items-center gap-3">
                <span className="text-xs text-muted-foreground">{group.count} skills</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
            </Link>

            <div className="divide-y divide-border border-t border-border">
              {group.children.map((child) => (
                <Link
                  key={`${group.id}-${child.name}`}
                  href={child.href}
                  className="flex items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-muted/20"
                >
                  <span className="text-foreground">{child.name}</span>
                  <span className="text-xs text-muted-foreground">{child.count}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
