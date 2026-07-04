"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SkillFileSection } from "@/components/detail/skill-file-section";
import { SkillDetailSidebar, SkillInstallPanel } from "@/components/detail/skill-detail-sidebar";
import { SkillStatsRow } from "@/components/detail/skill-stats-row";
import type { Skill } from "@/data/mock";
import { buildSkillMdPreview, getRelatedSkills } from "@/data/detail";
import {
  getInstallPrompt,
  getSkillDetailMeta,
} from "@/lib/skill-detail-meta";
import { getSkillRepoName } from "@/lib/skill-url";

export function SkillDetailView({
  skill,
  githubTreeUrl,
  fromApi,
}: {
  skill: Skill;
  detailPath?: string;
  githubTreeUrl?: string;
  fromApi?: boolean;
}) {
  const repoName = getSkillRepoName(skill.repo);
  const githubRepoUrl = `https://github.com/${skill.author}/${repoName}`;
  const githubUrl = githubTreeUrl ?? githubRepoUrl;
  const meta = getSkillDetailMeta(skill);
  const skillMd = buildSkillMdPreview(skill);
  const sameRepoSkills = getRelatedSkills(skill, 8).filter(
    (s) => getSkillRepoName(s.repo) === repoName || s.repo === skill.repo
  );
  const relatedSkills = sameRepoSkills.filter((s) => s.id !== skill.id).slice(0, 6);

  const installCommand = `/plugin marketplace add ${skill.author}/${repoName}`;
  const installPrompt = getInstallPrompt(skill, repoName);
  const repoLabel = repoName.charAt(0).toUpperCase() + repoName.slice(1);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_350px] lg:items-start">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm">
              <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground sm:gap-2.5">
                <li>
                  <Link href="/" className="transition-colors hover:text-primary">
                    首页
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li>
                  <Link href="/creators" className="transition-colors hover:text-primary">
                    创作者
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li>
                  <Link
                    href={`/creators/${skill.author}`}
                    className="transition-colors hover:text-primary"
                  >
                    {skill.author}
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li>
                  <Link
                    href={`/creators/${skill.author}/${repoName}`}
                    className="transition-colors hover:text-primary"
                  >
                    {repoLabel}
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li>
                  <span className="font-medium text-foreground" aria-current="page">
                    {skill.name}
                  </span>
                </li>
              </ol>
            </nav>

            <div>
              <div className="min-w-0">
                <h1 className="max-w-5xl text-3xl font-bold tracking-normal text-foreground sm:text-4xl">
                  <span className="block wrap-anywhere text-primary">{skill.name}</span>
                </h1>
                <SkillStatsRow meta={meta} />
              </div>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">{skill.description}</p>

              {fromApi && <p className="mt-2 text-xs text-primary">· 实时索引</p>}

              <SkillInstallPanel prompt={installPrompt} command={installCommand} />
            </div>
          </div>

          <div className="w-full lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:w-[350px] lg:max-w-[350px] lg:self-start">
            <SkillDetailSidebar skill={skill} githubUrl={githubUrl} />
          </div>

          <div className="min-w-0 lg:col-start-1 lg:row-start-2">
            <SkillFileSection skillMd={skillMd} sameRepoSkills={relatedSkills} />
          </div>
        </div>
      </div>
    </div>
  );
}
