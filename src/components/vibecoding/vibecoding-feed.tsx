"use client";

import { Clock, Loader2, Star } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { VibecodingGrid } from "@/components/vibecoding/vibecoding-grid";
import type { VibecodingItem } from "@/lib/vibecoding-utils";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 12;

type SortMode = "score" | "recent";

export type VibecodingFeedType = "project" | "news";

export function VibecodingFeed({
  type,
  defaultSort = "score",
  countLabel,
  emptyTitle,
  emptyHint,
  header,
}: {
  type: VibecodingFeedType;
  defaultSort?: SortMode;
  countLabel: (total: number) => string;
  emptyTitle: string;
  emptyHint?: string;
  header: ReactNode;
}) {
  const [items, setItems] = useState<VibecodingItem[]>([]);
  const [sort, setSort] = useState<SortMode>(defaultSort);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [fromApi, setFromApi] = useState(false);
  const [error, setError] = useState("");
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingMoreRef = useRef(false);
  const pageRef = useRef(1);

  pageRef.current = page;

  const fetchPage = useCallback(
    async (pageNum: number, append: boolean, sortMode: SortMode) => {
      const params = new URLSearchParams({
        page: String(pageNum),
        limit: String(PAGE_SIZE),
        sort: sortMode,
        type,
        source: "hn",
      });
      const res = await fetch(`/api/vibecoding/items?${params}`);
      const data = await res.json();
      const nextItems: VibecodingItem[] = data.items ?? [];

      setItems((prev) => (append ? [...prev, ...nextItems] : nextItems));
      setTotal(data.total ?? 0);
      setHasNext(Boolean(data.hasNext));
      setFromApi(Boolean(data.fromApi));
      setPage(pageNum);
      setError(data.message && !data.success ? data.message : "");
    },
    [type]
  );

  useEffect(() => {
    setLoading(true);
    setItems([]);
    setPage(1);
    fetchPage(1, false, sort)
      .catch((e) => setError(e instanceof Error ? e.message : "加载失败"))
      .finally(() => setLoading(false));
  }, [sort, fetchPage]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasNext || loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || loadingMoreRef.current || !hasNext) return;
        loadingMoreRef.current = true;
        setLoadingMore(true);
        fetchPage(pageRef.current + 1, true, sort)
          .catch((e) => setError(e instanceof Error ? e.message : "加载失败"))
          .finally(() => {
            loadingMoreRef.current = false;
            setLoadingMore(false);
          });
      },
      { rootMargin: "240px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [fetchPage, hasNext, loading, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      {header}

      <div className="sticky top-16 z-40 -mx-4 mb-6 border-b border-border bg-background/95 px-4 py-3 shadow-lg shadow-background/70 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {fromApi ? countLabel(total) : "数据加载中…"}
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs font-medium text-muted-foreground">排序方式</span>
            <div className="flex items-center gap-2">
              {(["score", "recent"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setSort(mode)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition-colors",
                    sort === mode
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-card text-muted-foreground hover:border-primary/40"
                  )}
                >
                  {mode === "score" ? (
                    <>
                      <Star className="h-3.5 w-3.5" aria-hidden />
                      按热度
                    </>
                  ) : (
                    <>
                      <Clock className="h-3.5 w-3.5" aria-hidden />
                      按最新
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {error ? (
        <p className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
          {error}
        </p>
      ) : null}

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : items.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm font-medium text-foreground">{emptyTitle}</p>
          {emptyHint ? (
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{emptyHint}</p>
          ) : null}
        </div>
      ) : (
        <VibecodingGrid items={items} openAsArticle={type === "news"} />
      )}

      <div ref={sentinelRef} className="h-1" />
      {loadingMore ? (
        <div className="mt-4 flex justify-center pb-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : null}
    </div>
  );
}
