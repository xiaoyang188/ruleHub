"use client";

import { ArrowUpRight, Star } from "lucide-react";
import { useState } from "react";
import type { VibecodingItem } from "@/lib/vibecoding-utils";
import {
  displaySummary,
  displayTitle,
  extractDomain,
  formatRelativeTime,
  getPreviewCandidates,
} from "@/lib/vibecoding-utils";

function ItemAvatar({ item }: { item: VibecodingItem }) {
  const candidates = getPreviewCandidates(item);
  const [index, setIndex] = useState(0);
  const src = candidates[index];
  const initial = (item.author || displayTitle(item) || "?").charAt(0).toUpperCase();

  if (!src) {
    return (
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-muted/40 text-[10px] font-semibold text-foreground transition-transform duration-200 group-hover:scale-110">
        {initial}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt=""
      width={24}
      height={24}
      loading="lazy"
      referrerPolicy="no-referrer"
      className="h-6 w-6 shrink-0 rounded-full border border-primary/30 object-cover transition-transform duration-200 group-hover:scale-110"
      onError={() => {
        if (index < candidates.length - 1) setIndex((i) => i + 1);
      }}
    />
  );
}

export function VibecodingCard({ item }: { item: VibecodingItem }) {
  const domain = extractDomain(item.url);
  const title = displayTitle(item);
  const summary = displaySummary(item);
  const metaLine = [domain, item.author ? `@${item.author}` : ""].filter(Boolean).join(" · ");

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 active:translate-y-0 active:scale-[0.99]"
    >
      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2.5">
        <h3
          className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground group-hover:text-primary"
          title={title}
        >
          {title}
        </h3>
        <span className="ml-2 flex shrink-0 items-center gap-1">
          <Star className="h-2.5 w-2.5 fill-star text-star" aria-hidden />
          <span className="text-xs font-medium tabular-nums text-foreground">{item.score}</span>
        </span>
      </div>

      <div className="relative z-10 flex min-w-0 flex-1 flex-col px-4 pb-2.5 pt-2">
        <div className="flex h-8 items-center gap-2">
          <ItemAvatar item={item} />
          <span className="truncate text-xs text-muted-foreground" title={metaLine}>
            {metaLine || "Hacker News"}
          </span>
        </div>
        {summary ? (
          <p className="mt-1 flex-1 text-xs leading-relaxed text-muted-foreground">{summary}</p>
        ) : null}
      </div>

      <div className="mt-auto flex min-h-8 items-center justify-between border-t border-border/50 bg-muted/20 px-4">
        <time className="text-xs text-muted-foreground">
          {item.publishedAt ? formatRelativeTime(item.publishedAt) : "—"}
        </time>
        <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
          {item.commentCount > 0 ? <span>{item.commentCount} 评论</span> : null}
          <ArrowUpRight
            className="h-3.5 w-3.5 text-muted-foreground/50 transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </span>
      </div>
    </a>
  );
}
