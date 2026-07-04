"use client";

import { Clock, Loader2, Search, Star } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SearchSkillColumns } from "@/components/search/search-skill-columns";
import type { Skill } from "@/data/mock";
import type { SearchSkill } from "@/lib/skillsmp-api";
import { getSkillDetailPath } from "@/lib/skill-url";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 12;

function parseStars(value: string) {
  const normalized = value.toLowerCase();
  const amount = Number.parseFloat(normalized.replace(/,/g, ""));
  if (normalized.endsWith("m")) return amount * 1_000_000;
  if (normalized.endsWith("k")) return amount * 1_000;
  return amount || 0;
}

function SortToggle({
  sort,
  onChange,
}: {
  sort: "stars" | "recent";
  onChange: (sort: "stars" | "recent") => void;
}) {
  return (
    <div
      role="group"
      aria-label="排序"
      className="inline-flex shrink-0 items-center rounded-lg border border-border bg-card/50 p-1"
    >
      <button
        type="button"
        role="radio"
        aria-checked={sort === "stars"}
        aria-label="Sort by stars"
        data-state={sort === "stars" ? "on" : "off"}
        onClick={() => onChange("stars")}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-primary/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow-sm"
        )}
      >
        <Star className="h-4 w-4" aria-hidden />
        Stars
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={sort === "recent"}
        aria-label="Sort by recent"
        data-state={sort === "recent" ? "on" : "off"}
        onClick={() => onChange("recent")}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-primary/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow-sm"
        )}
      >
        <Clock className="h-4 w-4" aria-hidden />
        最近更新
      </button>
    </div>
  );
}

export function BrowseSkillsPanel({
  skills: localSkills,
  searchPlaceholder,
  emptyMessage = "未找到匹配的 skills",
  categorySlug,
  occupationId,
}: {
  skills?: Skill[];
  searchPlaceholder: string;
  emptyMessage?: string;
  categorySlug?: string;
  occupationId?: string;
}) {
  const [apiFailed, setApiFailed] = useState(false);
  const useApi = Boolean(categorySlug || occupationId) && !apiFailed;
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [sort, setSort] = useState<"stars" | "recent">("stars");
  const [apiResults, setApiResults] = useState<SearchSkill[]>([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(useApi);
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef(1);
  const loadingMoreRef = useRef(false);

  pageRef.current = page;

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [query]);

  const fetchPage = useCallback(
    async (pageNum: number, append: boolean) => {
      const params = new URLSearchParams({
        sortBy: sort,
        limit: String(PAGE_SIZE),
        page: String(pageNum),
      });
      if (categorySlug) params.set("category", categorySlug);
      if (occupationId) params.set("occupation", occupationId);
      if (debouncedQuery) params.set("q", debouncedQuery);

      const res = await fetch(`/api/skills/search?${params}`);
      const data = await res.json();
      const skills: SearchSkill[] = data.skills ?? [];

      setApiResults((prev) => (append ? [...prev, ...skills] : skills));
      setHasNext(Boolean(data.hasNext));
      setPage(pageNum);
      setApiFailed(false);
    },
    [categorySlug, debouncedQuery, occupationId, sort]
  );

  useEffect(() => {
    if (!categorySlug && !occupationId) return;

    setLoading(true);
    setApiResults([]);
    setPage(1);
    setHasNext(false);

    fetchPage(1, false)
      .catch(() => {
        setApiResults([]);
        setHasNext(false);
        setApiFailed(true);
      })
      .finally(() => setLoading(false));
  }, [categorySlug, debouncedQuery, fetchPage, occupationId, sort]);

  useEffect(() => {
    if (!useApi || !hasNext || loading) return;

    const node = sentinelRef.current;
    if (!node) return;

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
  }, [fetchPage, hasNext, loading, useApi]);

  const localResults = useMemo(() => {
    if (useApi || !localSkills) return [];
    const q = query.trim().toLowerCase();
    let list = localSkills;
    if (q) {
      list = list.filter(
        (skill) =>
          skill.name.toLowerCase().includes(q) ||
          skill.description.toLowerCase().includes(q) ||
          skill.author.toLowerCase().includes(q)
      );
    }
    return [...list]
      .sort((a, b) => {
        if (sort === "recent") {
          return b.updatedAt.localeCompare(a.updatedAt);
        }
        return parseStars(b.stars) - parseStars(a.stars);
      })
      .map((skill) => ({ ...skill, detailHref: getSkillDetailPath(skill) }));
  }, [localSkills, query, sort, useApi]);

  const results = useApi ? apiResults : localResults;
  const filteredQuery = query.trim() || undefined;

  return (
    <div>
      <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <div className="relative w-full flex-1 sm:w-auto">
          <div className="relative flex items-start overflow-hidden rounded-2xl border-2 border-border bg-card transition-all duration-300 hover:border-primary focus-within:border-primary">
            <Search
              className="pointer-events-none absolute left-5 top-4 h-5 w-5 shrink-0 text-muted-foreground"
              aria-hidden
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              className="min-w-0 flex-1 bg-transparent py-4 pl-12 pr-4 text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
        <SortToggle sort={sort} onChange={setSort} />
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          加载 skills…
        </div>
      ) : results.length > 0 ? (
        <SearchSkillColumns skills={results} query={filteredQuery} />
      ) : (
        <p className="py-16 text-center text-sm text-muted-foreground">{emptyMessage}</p>
      )}

      {loadingMore && (
        <div className="flex items-center justify-center gap-2 py-8 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          加载更多…
        </div>
      )}

      {useApi && <div ref={sentinelRef} className="h-1" aria-hidden />}
    </div>
  );
}
