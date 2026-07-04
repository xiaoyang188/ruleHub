"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronRight, ListTree } from "lucide-react";
import { useState } from "react";
import { CreatorRepoOverviewRow } from "@/components/detail/creator-repo-overview-row";
import { CreatorRepoSkillSection } from "@/components/detail/creator-repo-skill-section";
import {
  getCreatorLatestDate,
  groupSkillsByRepo,
} from "@/lib/creator-profile";
import type { SearchSkill } from "@/lib/skillsmp-api";

function CreatorProfileAvatar({ author }: { author: string }) {
  const [failed, setFailed] = useState(false);
  const initial = author.charAt(0).toUpperCase();

  if (failed) {
    return (
      <span className="flex h-[72px] w-[72px] items-center justify-center rounded-lg border border-border bg-muted/40 text-xl font-semibold">
        {initial}
      </span>
    );
  }

  return (
    <img
      src={`https://github.com/${author}.png?size=144`}
      alt={author}
      width={72}
      height={72}
      className="h-[72px] w-[72px] rounded-lg border border-border object-cover"
      onError={() => setFailed(true)}
    />
  );
}

export function CreatorProfileView({
  author,
  skills,
}: {
  author: string;
  skills: SearchSkill[];
}) {
  const repoGroups = groupSkillsByRepo(skills);
  const repoCount = repoGroups.length;
  const skillCount = skills.length;
  const latestDate = getCreatorLatestDate(skills);
  const topRepo = repoGroups[0]?.repoName;

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
            <Link href="/creators" className="transition-colors hover:text-foreground">
              创作者
            </Link>
          </li>
          <li className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            <span className="text-foreground">{author}</span>
          </li>
        </ol>
      </nav>

      <section className="mb-6 overflow-hidden border-y border-border bg-card">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="flex min-w-0 flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center">
            <div className="shrink-0">
              <CreatorProfileAvatar author={author} />
            </div>
            <div className="min-w-0">
              <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-primary">
                GitHub 创作者资料
              </div>
              <h1 className="mt-1 truncate text-3xl font-bold text-foreground sm:text-4xl">
                {author}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                按仓库查看 {repoCount} 个 GitHub 仓库中的 {skillCount} 个已收集 skills。
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-xs">
                <a
                  href={`https://github.com/${author}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 border border-border bg-background px-2.5 py-1.5 text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  github/{author}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </a>
                {topRepo && (
                  <a
                    href={`#repo-${topRepo}`}
                    className="inline-flex items-center gap-1 border border-border bg-background px-2.5 py-1.5 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    最大仓库：{topRepo}
                    <ListTree className="h-3.5 w-3.5" aria-hidden />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="grid border-t border-border font-mono text-xs sm:grid-cols-3 lg:border-l lg:border-t-0">
            <div className="border-l border-border px-4 py-3 first:border-l-0">
              <div className="font-mono text-[11px] text-muted-foreground">已收集 skills</div>
              <div className="mt-1 font-mono text-lg font-semibold text-foreground">{skillCount}</div>
            </div>
            <div className="border-l border-border px-4 py-3 first:border-l-0">
              <div className="font-mono text-[11px] text-muted-foreground">仓库</div>
              <div className="mt-1 font-mono text-lg font-semibold text-foreground">{repoCount}</div>
            </div>
            <div className="border-l border-border px-4 py-3 first:border-l-0">
              <div className="font-mono text-[11px] text-muted-foreground">更新</div>
              <div className="mt-1 font-mono text-lg font-semibold text-foreground">{latestDate}</div>
            </div>
          </div>
        </div>
      </section>

      {repoGroups.length > 0 && (
        <section className="mb-6 border-y border-border bg-card">
          <div className="grid gap-0 border-b border-border lg:grid-cols-[260px_minmax(0,1fr)]">
            <div className="border-b border-border px-4 py-3 lg:border-b-0 lg:border-r">
              <div className="font-mono text-[11px] uppercase text-muted-foreground">仓库分布</div>
              <h2 className="mt-1 text-lg font-semibold text-foreground">Skills 分布在哪些仓库</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                按已收集 skill 数展示主要仓库，并显示它们在该创作者目录中的占比和职业覆盖。
              </p>
            </div>
            <div className="divide-y divide-border">
              {repoGroups.map((group, index) => (
                <CreatorRepoOverviewRow key={group.repoName} group={group} rank={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="space-y-4">
        <div className="flex items-center justify-between border-y border-border bg-card px-4 py-3">
          <div>
            <div className="font-mono text-[11px] uppercase text-muted-foreground">仓库浏览</div>
            <h2 className="mt-1 text-lg font-semibold text-foreground">仓库与代表性 skills</h2>
          </div>
          <div className="hidden font-mono text-xs text-muted-foreground sm:block">
            创作者/仓库/skill
          </div>
        </div>

        <div className="space-y-6">
          {repoGroups.map((group, index) => (
            <CreatorRepoSkillSection
              key={group.repoName}
              author={author}
              group={group}
              rank={index}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
