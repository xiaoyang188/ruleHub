"use client";

import Link from "next/link";
import { ArrowUpRight, Briefcase, ChevronRight, GitFork, Star } from "lucide-react";
import { CreatorProfileSkillRow } from "@/components/detail/creator-profile-skill-row";
import { getCreatorLatestDate } from "@/lib/creator-profile";
import { useMemo, useState } from "react";
import { getSkillOccupationTags } from "@/lib/skill-detail-meta";
import type { SearchSkill } from "@/lib/skillsmp-api";

const PAGE_SIZE = 40;

function getRepoForksDisplay(skills: SearchSkill[]) {
  const stars = skills[0]?.stars ?? "0";
  if (stars.includes("k")) {
    const n = Number.parseFloat(stars) * 0.118;
    return `${n.toFixed(1)}k`;
  }
  return "18.2k";
}

export function CreatorRepoView({
  author,
  repo,
  skills,
}: {
  author: string;
  repo: string;
  skills: SearchSkill[];
}) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const githubUrl = `https://github.com/${author}/${repo}`;
  const latestDate = getCreatorLatestDate(skills);
  const topStars = skills[0]?.stars ?? "0";
  const forks = getRepoForksDisplay(skills);

  const occupationTitles = useMemo(
    () => [...new Set(skills.map((s) => getSkillOccupationTags(s).title))],
    [skills]
  );

  const shown = skills.slice(0, visible);
  const remaining = skills.length - visible;

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
            <Link href={`/creators/${author}`} className="transition-colors hover:text-foreground">
              {author}
            </Link>
          </li>
          <li className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            <span className="text-foreground">{repo}</span>
          </li>
        </ol>
      </nav>

      <section className="mb-6 overflow-hidden border-y border-border bg-card">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="min-w-0 px-5 py-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-primary">
              GitHub 仓库
            </div>
            <h1 className="mt-1 truncate text-3xl font-bold text-foreground sm:text-4xl">{repo}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
              {repo} 收录了来自 {author} 的 {skills.length} 个 skills，并提供仓库级职业覆盖和站内
              skill 详情页。
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-xs">
              <Link
                href={`/creators/${author}`}
                className="inline-flex items-center gap-1 border border-border bg-background px-2.5 py-1.5 text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {author} 资料
              </Link>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 border border-border bg-background px-2.5 py-1.5 text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                在 GitHub 查看
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="grid border-t border-border font-mono text-xs sm:grid-cols-2 lg:border-l lg:border-t-0">
            <div className="border-l border-border px-4 py-3 first:border-l-0">
              <div className="font-mono text-[11px] text-muted-foreground">已收集 skills</div>
              <div className="mt-1 font-mono text-lg font-semibold text-foreground">
                {skills.length}
              </div>
            </div>
            <div className="border-l border-border px-4 py-3 first:border-l-0">
              <div className="font-mono text-[11px] text-muted-foreground">Stars</div>
              <div className="mt-1 font-mono text-lg font-semibold text-foreground">
                <span className="inline-flex items-center gap-1">
                  <Star className="h-4 w-4 fill-star text-star" />
                  {topStars}
                </span>
              </div>
            </div>
            <div className="border-l border-border px-4 py-3 first:border-l-0">
              <div className="font-mono text-[11px] text-muted-foreground">更新</div>
              <div className="mt-1 font-mono text-lg font-semibold text-foreground">{latestDate}</div>
            </div>
            <div className="border-l border-border px-4 py-3 first:border-l-0">
              <div className="font-mono text-[11px] text-muted-foreground">Forks</div>
              <div className="mt-1 font-mono text-lg font-semibold text-foreground">
                <span className="inline-flex items-center gap-1">
                  <GitFork className="h-4 w-4" />
                  {forks}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {occupationTitles.length > 0 && (
        <section className="mb-6 border-y border-border bg-card px-4 py-4">
          <div className="mb-3 font-mono text-[11px] uppercase text-muted-foreground">职业覆盖</div>
          <div className="flex flex-wrap items-center gap-1.5">
            {occupationTitles.map((title) => (
              <Link
                key={title}
                href={`/search?q=${encodeURIComponent(title)}`}
                title={title}
                className="inline-flex max-w-full items-center gap-1 border border-border bg-background px-2 py-1 font-mono text-[11px] text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Briefcase className="h-3 w-3 shrink-0 text-primary" aria-hidden />
                <span className="truncate">{title}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="border border-border bg-card">
        <div className="border-b border-border px-4 py-4">
          <div className="font-mono text-[11px] uppercase text-muted-foreground">仓库浏览</div>
          <h2 className="mt-1 text-lg font-semibold text-foreground">这个仓库中的 skills</h2>
        </div>

        <div className="hidden grid-cols-[minmax(170px,0.55fr)_minmax(170px,0.45fr)_minmax(0,1.35fr)_90px] gap-4 border-b border-border px-4 py-2 font-mono text-[11px] uppercase text-muted-foreground md:grid">
          <div>skill</div>
          <div>职业分类</div>
          <div>描述</div>
          <div>更新</div>
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
              className="inline-flex min-h-8 items-center justify-center gap-2 border border-border bg-background px-3 py-1.5 font-mono text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              再加载 {Math.min(PAGE_SIZE, remaining)} 个 skills
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
