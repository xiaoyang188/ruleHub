"use client";

import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { CreatorDirectoryRow } from "@/components/creators/creator-directory-row";
import { CreatorDirectoryOccupationFilter } from "@/components/creators/creator-directory-occupation-filter";
import {
  CREATOR_DIRECTORY,
  CREATOR_DIRECTORY_STATS,
} from "@/data/creators-directory";
import { getCreatorOccupationLabel } from "@/data/creator-occupation-filter";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 100;

export function CreatorsPageContent() {
  const [query, setQuery] = useState("");
  const [occupation, setOccupation] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CREATOR_DIRECTORY.filter((creator) => {
      if (q && !creator.author.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const occupationLabel = occupation ? getCreatorOccupationLabel(occupation) : "";
  const loadedCount = pageItems.length;

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
            <span className="text-foreground">创作者</span>
          </li>
        </ol>
      </nav>

      <section className="mb-6 border-y border-border bg-card/60">
        <div className="grid gap-6 px-4 py-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <h1 className="text-2xl font-semibold tracking-normal text-foreground sm:text-3xl">
              GitHub 创作者
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
              浏览 RuleHub 中的创作者和组织。每个创作者页面都会汇总它维护的 GitHub
              仓库、仓库内发现的 skills，以及最近更新的统计数据。默认优先展示 GitHub
              认可度、代表仓库热度和近期活跃度更高的创作者。
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="rounded-lg border border-border bg-background px-3 py-2">
              <div className="text-muted-foreground">创作者</div>
              <div className="text-lg font-semibold text-foreground">
                {CREATOR_DIRECTORY_STATS.totalCreators}
              </div>
            </div>
            <div className="rounded-lg border border-border bg-background px-3 py-2">
              <div className="text-muted-foreground">仓库</div>
              <div className="text-lg font-semibold text-foreground">
                {CREATOR_DIRECTORY_STATS.totalRepos}
              </div>
            </div>
            <div className="rounded-lg border border-border bg-background px-3 py-2">
              <div className="text-muted-foreground">Skills</div>
              <div className="text-lg font-semibold text-foreground">
                {CREATOR_DIRECTORY_STATS.totalSkills}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-4">
        <div className="border-y border-border bg-card">
          <div className="flex flex-col gap-2 border-b border-border bg-muted/20 px-4 py-3 md:flex-row md:items-center md:justify-between">
            <CreatorDirectoryOccupationFilter
              value={occupation}
              onChange={(id) => {
                setOccupation(id);
                setPage(1);
              }}
            />
            <div className="flex min-w-0 items-center gap-2 border border-border bg-background px-3 py-2 md:w-[420px]">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                type="search"
                aria-label="搜索创作者或技能..."
                placeholder="搜索创作者或技能..."
                className="min-w-0 flex-1 bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/50"
              />
            </div>
          </div>

          <div className="flex min-h-9 items-center px-4 py-2 font-mono text-xs text-muted-foreground">
            {occupation
              ? `已在 ${occupationLabel} 中加载 ${loadedCount} 个创作者.`
              : `已加载 ${loadedCount} 个创作者.`}
          </div>
          <div className="border-t border-border px-4 py-2 font-mono text-[11px] leading-relaxed text-muted-foreground/80">
            数据可能与 GitHub 实时状态不同。职业标签为近似分类，并会随目录同步刷新。
          </div>

          <div className="hidden grid-cols-[72px_minmax(220px,1fr)_minmax(280px,1.35fr)_100px_110px_120px_44px] gap-3 border-b border-border bg-muted/20 px-4 py-2 font-mono text-[11px] uppercase text-muted-foreground lg:grid">
            <div>排名</div>
            <div>创作者</div>
            <div>职业覆盖</div>
            <div>仓库</div>
            <div>Skills</div>
            <div>更新</div>
            <div />
          </div>

          {pageItems.map((creator, index) => (
            <CreatorDirectoryRow
              key={creator.author}
              creator={creator}
              rank={(currentPage - 1) * PAGE_SIZE + index + 1}
            />
          ))}
        </div>
      </div>

      <nav
        aria-label="Creator directory pages"
        className="mt-6 border-y border-border bg-card px-4 py-4"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-muted-foreground">
            Page {currentPage} of {CREATOR_DIRECTORY_STATS.totalPages}
          </p>
          <p className="font-mono text-[11px] text-muted-foreground">
            当前展示前 {CREATOR_DIRECTORY_STATS.listedCreators} /{" "}
            {CREATOR_DIRECTORY_STATS.totalCreators} 个创作者。可用搜索或职业筛选找到其余创作者。
          </p>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-1">
          {[1, 2, 3, 4, 5].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              className={cn(
                "inline-flex h-8 min-w-8 items-center justify-center border border-border px-2 font-mono text-xs transition-colors hover:border-primary hover:text-primary",
                currentPage === p && "border-primary text-primary"
              )}
            >
              {p}
            </button>
          ))}
          <span className="px-1 font-mono text-xs text-muted-foreground">...</span>
          <button
            type="button"
            onClick={() => setPage(CREATOR_DIRECTORY_STATS.totalPages)}
            className="inline-flex h-8 min-w-8 items-center justify-center border border-border px-2 font-mono text-xs transition-colors hover:border-primary hover:text-primary"
          >
            {CREATOR_DIRECTORY_STATS.totalPages}
          </button>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className="ml-1 inline-flex h-8 items-center justify-center border border-border px-3 font-mono text-xs transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </nav>
    </div>
  );
}
