"use client";

import Link from "next/link";
import { ChevronRight, Clock, Loader2, Search, Star } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { OccupationFilterDialog } from "@/components/search/occupation-filter-dialog";
import { SearchSkillColumns } from "@/components/search/search-skill-columns";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { STATS } from "@/data/mock";
import type { SearchSkill } from "@/lib/skillsmp-api";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 12;

export function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";
  const urlSort = searchParams.get("sort") === "recent" ? "recent" : "stars";
  const urlOccupation = searchParams.get("occupation") ?? "";

  const [query, setQuery] = useState(urlQuery);
  const [sort, setSort] = useState<"stars" | "recent">(urlSort);
  const [occupation, setOccupation] = useState(urlOccupation);
  const [results, setResults] = useState<SearchSkill[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [fromApi, setFromApi] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef(1);
  const loadingMoreRef = useRef(false);

  pageRef.current = page;

  useEffect(() => {
    setQuery(urlQuery);
    setSort(urlSort);
    setOccupation(urlOccupation);
  }, [urlQuery, urlSort, urlOccupation]);

  const fetchPage = useCallback(
    async (pageNum: number, append: boolean) => {
      const q = urlQuery.trim();
      const params = new URLSearchParams({
        sortBy: urlSort,
        limit: String(PAGE_SIZE),
        page: String(pageNum),
      });
      if (q) params.set("q", q);
      if (urlOccupation) params.set("occupation", urlOccupation);

      const res = await fetch(`/api/skills/search?${params}`);
      const data = await res.json();
      const skills: SearchSkill[] = data.skills ?? [];

      setResults((prev) => (append ? [...prev, ...skills] : skills));
      setTotal(data.total ?? 0);
      setFromApi(Boolean(data.fromApi));
      setHasNext(Boolean(data.hasNext));
      setPage(pageNum);
    },
    [urlQuery, urlSort, urlOccupation]
  );

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setResults([]);
    setPage(1);
    setHasNext(false);

    fetchPage(1, false)
      .catch(() => {
        if (!controller.signal.aborted) {
          setResults([]);
          setTotal(0);
          setHasNext(false);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [fetchPage]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasNext || loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || loadingMoreRef.current || !hasNext) return;
        loadingMoreRef.current = true;
        setLoadingMore(true);
        fetchPage(pageRef.current + 1, true)
          .catch(() => undefined)
          .finally(() => {
            loadingMoreRef.current = false;
            setLoadingMore(false);
          });
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [fetchPage, hasNext, loading]);

  const applySearch = useCallback(
    (next: { q?: string; sort?: string; occupation?: string }) => {
      const params = new URLSearchParams();
      const q = next.q ?? query;
      const s = next.sort ?? sort;
      const o = next.occupation ?? occupation;

      if (q.trim()) params.set("q", q.trim());
      if (s === "recent") params.set("sort", "recent");
      if (o) params.set("occupation", o);

      router.push(`/search${params.toString() ? `?${params}` : ""}`);
    },
    [query, sort, occupation, router]
  );

  const hasQuery = urlQuery.trim().length > 0;
  const browseCount =
    !hasQuery && total > 0 && total < 10000
      ? total.toLocaleString()
      : STATS.totalSkills;
  const displayTotal = total;
  const resultLabel = fromApi && displayTotal >= 1000 ? "1000" : displayTotal.toLocaleString();

  return (
    <div className="min-h-screen bg-background pt-8">
      <section
        aria-labelledby="skills-heading"
        className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8"
      >
        <nav aria-label="Breadcrumb" className="mb-5 text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="transition-colors hover:text-foreground">
                首页
              </Link>
            </li>
            <li className="flex items-center gap-1">
              <ChevronRight className="h-3.5 w-3.5 opacity-50" />
              <span className="text-foreground">搜索</span>
            </li>
          </ol>
        </nav>

        <ScrollReveal className="mb-5">
          <div className="mx-auto max-w-3xl">
            <div className="border-y border-border py-6 text-center">
              <h1
                id="skills-heading"
                className="mb-3 text-2xl font-bold text-foreground sm:text-3xl"
              >
                浏览 Agent Skills
              </h1>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
                <div className="inline-flex items-center gap-2">
                  <span className="text-xs text-muted-foreground/70">筛选</span>
                  <OccupationFilterDialog
                    value={occupation}
                    onChange={(id) => {
                      setOccupation(id);
                      applySearch({ occupation: id });
                    }}
                  />
                </div>

                <div className="inline-flex flex-wrap items-center justify-center gap-2">
                  <span className="text-xs text-muted-foreground/70">排序方式</span>
                  <div
                    role="group"
                    aria-label="排序"
                    className="inline-flex items-center gap-0.5 rounded-lg border border-border bg-card/50 p-1"
                  >
                    <button
                      type="button"
                      role="radio"
                      aria-checked={sort === "stars"}
                      aria-label="Sort by stars"
                      data-state={sort === "stars" ? "on" : "off"}
                      onClick={() => {
                        setSort("stars");
                        applySearch({ sort: "stars" });
                      }}
                      className={cn(
                        "inline-flex h-auto cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-primary/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 data-[state=on]:bg-primary/20 data-[state=on]:text-primary data-[state=on]:shadow-sm"
                      )}
                    >
                      <Star className="h-3 w-3" aria-hidden />
                      Stars
                    </button>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={sort === "recent"}
                      aria-label="Sort by recent"
                      data-state={sort === "recent" ? "on" : "off"}
                      onClick={() => {
                        setSort("recent");
                        applySearch({ sort: "recent" });
                      }}
                      className={cn(
                        "inline-flex h-auto cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-primary/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 data-[state=on]:bg-primary/20 data-[state=on]:text-primary data-[state=on]:shadow-sm"
                      )}
                    >
                      <Clock className="h-3 w-3" aria-hidden />
                      最新
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="sticky top-16 z-40 mb-4 bg-background/95 shadow-lg shadow-background/70 backdrop-blur">
          <ScrollReveal delay={100}>
            <div className="relative">
              <form
                role="search"
                onSubmit={(e) => {
                  e.preventDefault();
                  applySearch({});
                }}
              >
                <div
                  className="relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-200 hover:border-primary/50 focus-within:border-primary/70 focus-within:ring-2 focus-within:ring-primary/15"
                  aria-busy={loading}
                >
                  <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:px-5">
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <Search className="h-5 w-5 shrink-0 text-muted-foreground/70" aria-hidden />
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        type="text"
                        aria-label={`搜索 ${browseCount} 个 skills：试试 'AI 视频'、'数据分析'、'code review'...`}
                        placeholder={`搜索 ${hasQuery && fromApi ? resultLabel : browseCount} 个 skills：试试 'AI 视频'、'数据分析'、'code review'...`}
                        className="min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground/70"
                      />
                      {query && (
                        <button
                          type="button"
                          onClick={() => {
                            setQuery("");
                            applySearch({ q: "" });
                          }}
                          className="shrink-0 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                          清除
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </ScrollReveal>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            {hasQuery ? "搜索中…" : "加载 skills…"}
          </div>
        ) : results.length > 0 ? (
          <SearchSkillColumns
            skills={results}
            query={hasQuery ? urlQuery : undefined}
          />
        ) : hasQuery ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            未找到匹配的 skills，请尝试其他关键词
          </p>
        ) : (
          <p className="py-16 text-center text-sm text-muted-foreground">
            暂时无法加载 skills 列表，请稍后重试
          </p>
        )}

        {loadingMore && (
          <div className="flex items-center justify-center gap-2 py-8 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            加载更多…
          </div>
        )}

        <div ref={sentinelRef} className="h-1" aria-hidden />
      </section>
    </div>
  );
}
