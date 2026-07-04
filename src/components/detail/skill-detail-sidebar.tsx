"use client";

import { Briefcase, ChevronDown, Globe, Heart, Share2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CreatorAvatar } from "@/components/detail/creator-avatar";
import { ManusRunLink } from "@/components/detail/manus-link";
import type { Skill } from "@/data/mock";
import { getSkillOccupationTags } from "@/lib/skill-detail-meta";
import { getSkillRepoName } from "@/lib/skill-url";
import { siteFeatures } from "@/lib/site-features";
import { cn } from "@/lib/utils";

const AUTHOR_WEBSITE: Record<string, string> = {
  anthropics: "https://anthropic.com",
};

export function SkillDetailSidebar({
  skill,
  githubUrl,
}: {
  skill: Skill;
  githubUrl: string;
}) {
  const [favorited, setFavorited] = useState(false);
  const repoName = getSkillRepoName(skill.repo);
  const occupation = getSkillOccupationTags(skill);
  const website = AUTHOR_WEBSITE[skill.author];

  return (
    <aside className="space-y-6 pb-28 lg:pb-32">
      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between rounded-t-xl border-b border-border bg-muted/30 px-4 py-2">
          <span className="text-xs font-medium text-muted-foreground">来源</span>
          <div className="flex items-center gap-1">
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                title={website}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Globe className="h-3.5 w-3.5" />
              </a>
            )}
            <button
              type="button"
              aria-label="分享技能"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Share2 className="h-3.5 w-3.5" />
            </button>
            {siteFeatures.showFavorites && (
              <button
                type="button"
                aria-label={favorited ? "取消收藏" : "添加到收藏"}
                onClick={() => setFavorited((v) => !v)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-red-500"
              >
                <Heart className={cn("h-3.5 w-3.5", favorited && "fill-red-500 text-red-500")} />
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4 p-4">
          <div className="flex items-center gap-3">
            <CreatorAvatar author={skill.author} />
            <div className="min-w-0">
              <Link
                href={`/creators/${skill.author}`}
                className="block truncate font-semibold text-foreground hover:text-primary"
              >
                {skill.author}
              </Link>
              <p className="truncate text-xs text-muted-foreground">{skill.repo}</p>
            </div>
          </div>

          <div className="space-y-2">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary/50"
            >
              打开 GitHub 仓库
            </a>
            <Link
              href={`/creators/${skill.author}/${repoName}`}
              className="flex w-full items-center justify-center rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
            >
              查看创作者相关仓库
            </Link>
          </div>
        </div>
      </div>

      {(siteFeatures.showDownloads || siteFeatures.showManus) && (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2.5">
            <span className="text-xs font-medium text-muted-foreground">下载</span>
          </div>
          <div className="space-y-3 p-4 text-xs">
            {siteFeatures.showDownloads && (
              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                下载 Zip
              </button>
            )}
            <ManusRunLink variant="sidebar" />
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border bg-muted/30 px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-medium text-foreground">相关职业</span>
            <span className="text-[10px] font-semibold uppercase text-muted-foreground/60">SOC</span>
          </div>
          <p className="mt-1 text-[11px] leading-4 text-muted-foreground">基于 SOC 职业分类</p>
        </div>
        <div className="space-y-3 p-4 text-xs">
          <Link
            href="/occupations/1"
            aria-label={`查看${occupation.title}`}
            className="group block rounded-lg border border-border bg-muted/25 p-3.5 transition-colors hover:border-primary/55 hover:bg-muted/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          >
            <span className="flex items-start gap-3">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary">
                <Briefcase className="h-[15px] w-[15px]" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium leading-5 text-foreground transition-colors group-hover:text-primary">
                  {occupation.title}
                </span>
                <span className="mt-1 flex items-center gap-1 text-[11px] text-primary">
                  {occupation.code}
                </span>
              </span>
            </span>
          </Link>
        </div>
      </div>
    </aside>
  );
}

export function SkillInstallPanel({
  prompt,
  command,
}: {
  prompt: string;
  command: string;
}) {
  const [tab, setTab] = useState<"prompt" | "command">("prompt");
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <>
      <div className="mt-4 overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2">
          <span className="text-xs font-medium text-muted-foreground">安装</span>
        </div>

        <div className="space-y-2.5 p-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex w-fit gap-1 rounded-md bg-muted p-0.5">
              <button
                type="button"
                aria-pressed={tab === "prompt"}
                aria-label="Prompt"
                onClick={() => setTab("prompt")}
                className={cn(
                  "cursor-pointer rounded px-2.5 py-1 text-xs font-medium transition-colors",
                  tab === "prompt"
                    ? "border border-border bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Prompt
              </button>
              <button
                type="button"
                aria-pressed={tab === "command"}
                aria-label="安装命令"
                onClick={() => setTab("command")}
                className={cn(
                  "cursor-pointer rounded px-2.5 py-1 text-xs font-medium transition-colors",
                  tab === "command"
                    ? "border border-border bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                命令
              </button>
            </div>
          </div>

          {tab === "prompt" ? (
            <div className="space-y-2.5">
              <div className="flex flex-col gap-2 rounded-lg bg-muted/25 px-3 py-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="min-w-0 text-xs leading-5 text-muted-foreground">
                  <span className="font-medium text-foreground">用 Codex 或 Claude 帮你安装</span>{" "}
                  复制这段 Prompt，粘贴到 Codex、Claude 或其他助手里，让它检查 Skill 页面并帮你完成安装。
                </p>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <CopyButton text={prompt} label="复制 Prompt" />
                  <button
                    type="button"
                    onClick={() => setDetailsOpen((v) => !v)}
                    className="inline-flex w-full cursor-pointer items-center justify-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 sm:w-auto"
                  >
                    查看 Prompt 详情
                    <ChevronDown
                      className={cn("h-3.5 w-3.5 transition-transform", detailsOpen && "rotate-180")}
                    />
                  </button>
                </div>
              </div>
              {detailsOpen && (
                <pre className="overflow-x-auto rounded-lg bg-muted/30 p-3 text-xs text-muted-foreground">
                  <code>{prompt}</code>
                </pre>
              )}
            </div>
          ) : (
            <div className="space-y-2.5">
              <p className="text-xs text-muted-foreground">Claude Code 安装命令</p>
              <pre className="overflow-x-auto rounded-lg bg-muted/25 px-3 py-2 text-xs text-foreground">
                <code>{command}</code>
              </pre>
              <CopyButton text={command} label="复制命令" />
            </div>
          )}
        </div>
      </div>

      {siteFeatures.showManus && (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <ManusRunLink variant="main" />
        </div>
      )}
    </>
  );
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
    >
      {copied ? "已复制" : label}
    </button>
  );
}
