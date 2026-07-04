"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import type { CreatorDirectoryEntry } from "@/data/creators-directory";

function CreatorAvatar({ author }: { author: string }) {
  const [failed, setFailed] = useState(false);
  const initial = author.charAt(0).toUpperCase();

  if (failed) {
    return (
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/40 text-sm font-semibold">
        {initial}
      </span>
    );
  }

  return (
    <img
      src={`https://github.com/${author}.png?size=80`}
      alt={author}
      width={40}
      height={40}
      className="h-10 w-10 shrink-0 rounded-lg border border-border object-cover"
      onError={() => setFailed(true)}
    />
  );
}

export function CreatorDirectoryRow({
  creator,
  rank,
}: {
  creator: CreatorDirectoryEntry;
  rank: number;
}) {
  const rankLabel = `#${String(rank).padStart(3, "0")}`;

  return (
    <Link
      id={`creator-row-${rank}`}
      href={`/creators/${creator.author}`}
      className="group grid gap-3 border-b border-border px-4 py-4 transition-colors last:border-b-0 hover:bg-muted/25 lg:grid-cols-[72px_minmax(220px,1fr)_minmax(280px,1.35fr)_100px_110px_120px_44px] lg:items-center"
    >
      <div className="flex items-center justify-between lg:block">
        <span className="font-mono text-xs text-muted-foreground">{rankLabel}</span>
        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary lg:hidden" />
      </div>

      <div className="flex min-w-0 items-center gap-3">
        <CreatorAvatar author={creator.author} />
        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold text-foreground group-hover:text-primary">
            {creator.author}
          </h2>
          <div className="mt-1 flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted-foreground lg:hidden">
            <span>{creator.repos} 个仓库</span>
            <span>{creator.skills} 个 skills</span>
            <span>更新于 {creator.updated}</span>
          </div>
        </div>
      </div>

      <div className="hidden min-w-0 font-mono text-[11px] text-muted-foreground lg:block">
        {creator.occupations}
      </div>
      <div className="hidden font-mono text-sm text-muted-foreground lg:block">{creator.repos}</div>
      <div className="hidden font-mono text-sm text-muted-foreground lg:block">{creator.skills}</div>
      <div className="hidden font-mono text-xs text-muted-foreground lg:block">{creator.updated}</div>
      <div className="hidden justify-end lg:flex">
        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
      </div>

      <div className="font-mono text-[11px] text-muted-foreground lg:hidden">{creator.occupations}</div>
    </Link>
  );
}
