"use client";

import Link from "next/link";
import { ChevronRight, ExternalLink, GitBranch, Star } from "lucide-react";
import { useState } from "react";
import { CreatorProfileSkillRow } from "@/components/detail/creator-profile-skill-row";
import type { RepoGroup } from "@/lib/creator-profile";
import { formatRepoRank } from "@/lib/creator-profile";

const PAGE_SIZE = 40;

export function CreatorRepoSkillSection({
  author,
  group,
  rank,
}: {
  author: string;
  group: RepoGroup;
  rank: number;
}) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const shown = group.skills.slice(0, visible);
  const remaining = group.skills.length - visible;
  const topStars = group.skills[0]?.stars ?? "0";
  const githubUrl = `https://github.com/${author}/${group.repoName}`;

  return (
    <article
      id={`repo-${group.repoName}`}
      className="scroll-mt-24 border border-border bg-card shadow-[0_18px_50px_rgba(0,0,0,0.28)]"
    >
      <div className="h-1 bg-primary/45" aria-hidden />

      <div className="sticky top-16 z-20 overflow-hidden border-b border-border bg-card/90 shadow-[0_12px_30px_rgba(0,0,0,0.22)] backdrop-blur">
        <Link
          href={`/creators/${author}/${group.repoName}`}
          aria-label={`${author}/${group.repoName} repository page`}
          className="group/repo-header relative grid gap-4 px-5 py-4 pr-16 transition-colors hover:bg-muted/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary lg:grid-cols-[72px_minmax(0,1fr)_240px] lg:items-center"
        >
          <div className="font-mono text-[11px] text-muted-foreground">
            {formatRepoRank(rank, 3)}
          </div>

          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-2">
              <span className="truncate text-lg font-semibold leading-tight text-foreground transition-colors group-hover/repo-header:text-primary">
                {group.repoName}
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover/repo-header:text-primary" />
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[11px] leading-5 text-muted-foreground">
              <span>{group.skills.length} 个 skills</span>
              <span className="inline-flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-star text-star" />
                {topStars}
              </span>
              <span className="inline-flex items-center gap-1">
                <GitBranch className="h-3.5 w-3.5" />
                {group.skills.length}
              </span>
              <span>更新于 {group.latestDate}</span>
            </div>
          </div>

          <div className="font-mono text-xs text-muted-foreground lg:text-right">
            <div>占该创作者 {group.sharePercent}%</div>
            <div className="mt-2 h-1.5 bg-muted">
              <div className="h-full bg-primary" style={{ width: `${group.sharePercent}%` }} />
            </div>
          </div>
        </Link>

        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`GitHub ${author}/${group.repoName}`}
          className="absolute right-5 top-1/2 z-20 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-border bg-background/90 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="divide-y divide-border">
        {shown.map((skill) => (
          <CreatorProfileSkillRow key={skill.id} skill={skill} />
        ))}
      </div>

      {remaining > 0 && (
        <div className="border-t border-border px-4 py-4">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="inline-flex min-h-8 items-center justify-center gap-2 border border-border bg-background px-3 py-1.5 font-mono text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            再加载 {Math.min(PAGE_SIZE, remaining)} 个 skills
          </button>
        </div>
      )}
    </article>
  );
}
