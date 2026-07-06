"use client";

import { ExternalLink, Loader2, MessageCircle, Sparkles, Star } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { VibecodingItem } from "@/lib/vibecoding-api";
import { formatRelativeTime, sourceLabel } from "@/lib/vibecoding-api";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 20;

type SortMode = "score" | "recent";

function VibecodingCard({ item }: { item: VibecodingItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex items-center rounded-md border border-border bg-muted/30 px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {sourceLabel(item.source)}
        </span>
        <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <h3 className="mt-3 line-clamp-2 text-base font-semibold leading-snug text-foreground group-hover:text-primary">
        {item.title}
      </h3>

      {item.summary ? (
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {item.summary}
        </p>
      ) : (
        <div className="flex-1" />
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        {item.author ? <span>@{item.author}</span> : null}
        <span className="inline-flex items-center gap-1">
          <Star className="h-3.5 w-3.5 text-star" />
          {item.score}
        </span>
        <span className="inline-flex items-center gap-1">
          <MessageCircle className="h-3.5 w-3.5" />
          {item.commentCount}
        </span>
        {item.publishedAt ? (
          <span>{formatRelativeTime(item.publishedAt)}</span>
        ) : null}
      </div>
    </a>
  );
}

export function VibecodingPageContent() {
  const [items, setItems] = useState<VibecodingItem[]>([]);
  const [sort, setSort] = useState<SortMode>("score");
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

  const fetchPage = useCallback(async (pageNum: number, append: boolean, sortMode: SortMode) => {
    const params = new URLSearchParams({
      page: String(pageNum),
      limit: String(PAGE_SIZE),
      sort: sortMode,
      type: "project",
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
  }, []);

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
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [fetchPage, hasNext, loading, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <ScrollReveal>
        <header className="mx-auto max-w-3xl border-y border-border py-8 text-center">
          <p className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            VibeCoding 鉴赏
          </p>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            发现最新的 AI 编程项目与灵感
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            聚合 Hacker News Show HN 等项目来源，筛选与 AI、Agent、Vibe Coding 相关的新作品。
          </p>
        </header>
      </ScrollReveal>

      <div className="mx-auto mt-8 flex max-w-5xl items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {fromApi ? `共 ${total} 条` : "数据加载中…"}
        </p>
        <div className="flex items-center gap-2">
          {(["score", "recent"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setSort(mode)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-sm transition-colors",
                sort === mode
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40"
              )}
            >
              {mode === "score" ? "按热度" : "按最新"}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <p className="mx-auto mt-8 max-w-5xl rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
          {error}
        </p>
      ) : null}

      {loading ? (
        <div className="mt-12 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : items.length === 0 ? (
        <p className="mt-12 text-center text-sm text-muted-foreground">
          暂无数据，请稍后重试或先在 zuqiu-api 执行同步。
        </p>
      ) : (
        <div className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <VibecodingCard key={item.id} item={item} />
          ))}
        </div>
      )}

      <div ref={sentinelRef} className="h-8" />
      {loadingMore ? (
        <div className="mt-4 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : null}
    </div>
  );
}
