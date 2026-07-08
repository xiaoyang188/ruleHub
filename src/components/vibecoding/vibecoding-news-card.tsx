"use client";

import Link from "next/link";
import { ChevronRight, MessageCircle, Star } from "lucide-react";
import { useState } from "react";
import type { VibecodingItem } from "@/lib/vibecoding-utils";
import {
  displaySummary,
  displayTitle,
  extractDomain,
  formatRelativeTime,
  getNewsArticlePath,
  getPreviewCandidates,
} from "@/lib/vibecoding-utils";

function SourceIcon({ item }: { item: VibecodingItem }) {
  const candidates = getPreviewCandidates(item);
  const [index, setIndex] = useState(0);
  const src = candidates[index];
  const initial = (extractDomain(item.url) || item.author || "?").charAt(0).toUpperCase();

  if (!src) {
    return (
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-xs font-bold text-primary">
        {initial}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt=""
      width={36}
      height={36}
      loading="lazy"
      referrerPolicy="no-referrer"
      className="h-9 w-9 shrink-0 rounded-lg border border-primary/20 bg-muted/30 object-cover p-0.5"
      onError={() => {
        if (index < candidates.length - 1) setIndex((i) => i + 1);
      }}
    />
  );
}

export function VibecodingNewsCard({ item }: { item: VibecodingItem }) {
  const domain = extractDomain(item.url);
  const title = displayTitle(item);
  const summary = displaySummary(item);
  const timeLabel = item.publishedAt ? formatRelativeTime(item.publishedAt) : null;

  return (
    <Link
      href={getNewsArticlePath(item.id)}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_20px_50px_-24px_rgba(217,145,120,0.45)] active:scale-[0.99]"
    >
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-0.5 bg-primary/0 transition-colors duration-300 group-hover:bg-primary"
      />

      <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-gradient-to-r from-primary/[0.08] to-transparent px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <SourceIcon item={item} />
          <span className="truncate text-xs font-medium text-muted-foreground group-hover:text-foreground">
            {domain || "Hacker News"}
          </span>
        </div>
        {timeLabel ? (
          <time className="shrink-0 text-[11px] tabular-nums text-primary/80">{timeLabel}</time>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-2.5 px-4 py-3.5">
        <h3
          className="line-clamp-3 text-[15px] font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary"
          title={title}
        >
          {title}
        </h3>
        {summary ? (
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground/90">{summary}</p>
        ) : null}
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 border-t border-border/50 bg-muted/15 px-4 py-2.5">
        <div className="flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] text-muted-foreground">
          {item.author ? <span className="truncate">@{item.author}</span> : null}
          <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-1.5 py-0.5 font-medium tabular-nums text-primary">
            <Star className="h-3 w-3 fill-primary/30 text-primary" aria-hidden />
            {item.score}
          </span>
          {item.commentCount > 0 ? (
            <span className="inline-flex items-center gap-1">
              <MessageCircle className="h-3 w-3" aria-hidden />
              {item.commentCount}
            </span>
          ) : null}
        </div>
        <span className="inline-flex shrink-0 items-center gap-0.5 text-[11px] font-medium text-primary/70 transition-colors group-hover:text-primary">
          阅读
          <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
