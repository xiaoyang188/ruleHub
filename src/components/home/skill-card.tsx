"use client";

import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { useState, type ReactNode } from "react";
import type { Skill } from "@/data/mock";
import { siteFeatures } from "@/lib/site-features";
import { getSkillDetailPath } from "@/lib/skill-url";

type SkillLike = Skill & { detailHref?: string };

function highlightText(text: string, query?: string): ReactNode {
  if (!query?.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={index} className="rounded bg-primary/20 px-0.5 text-foreground">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

function Avatar({ author }: { author: string }) {
  const [failed, setFailed] = useState(false);
  const initial = author.charAt(0).toUpperCase();

  if (failed) {
    return (
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-muted/40 text-[10px] font-semibold text-foreground transition-transform duration-200 group-hover:scale-110">
        {initial}
      </span>
    );
  }

  return (
    <img
      src={`https://github.com/${author}.png?size=48`}
      alt={author}
      width={24}
      height={24}
      loading="lazy"
      className="h-6 w-6 shrink-0 rounded-full border border-primary/30 object-cover transition-transform duration-200 group-hover:scale-110"
      onError={() => setFailed(true)}
    />
  );
}

export function SkillCard({
  skill,
  query,
  showFavorite = false,
  openInNewTab = false,
}: {
  skill: SkillLike;
  query?: string;
  showFavorite?: boolean;
  openInNewTab?: boolean;
}) {
  const [favorited, setFavorited] = useState(false);
  const href = skill.detailHref ?? getSkillDetailPath(skill);

  return (
    <div className="group relative h-full">
      <Link
        href={href}
        className="block h-full"
        {...(openInNewTab
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 active:translate-y-0 active:scale-[0.99] gpu-accelerated">
          <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2.5">
            <h3
              className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground group-hover:text-primary"
              title={skill.name}
            >
              {highlightText(skill.name, query)}
            </h3>
            <span className="flex shrink-0 items-center gap-1">
              <Star className="h-2.5 w-2.5 fill-star text-star" aria-hidden />
              <span className="text-xs font-medium text-foreground">{skill.stars}</span>
            </span>
          </div>

          <div className="relative z-10 flex min-w-0 flex-1 flex-col px-4 pb-2.5 pt-2">
            <div className="flex h-8 items-center gap-2">
              <Avatar author={skill.author} />
              <span className="truncate text-xs text-muted-foreground">{skill.repo}</span>
            </div>
            <p className="mt-1 flex-1 text-xs leading-relaxed text-muted-foreground">
              {highlightText(skill.description, query)}
            </p>
          </div>

          <div className="mt-auto flex min-h-8 items-center justify-between border-t border-border/50 bg-muted/20 px-4">
            <time className="text-xs text-muted-foreground">{skill.updatedAt}</time>
            {showFavorite && siteFeatures.showFavorites && (
              <div className="pointer-events-none">
                <button
                  type="button"
                  title={favorited ? "取消收藏" : "添加到收藏"}
                  aria-label={favorited ? "取消收藏" : "添加到收藏"}
                  onClick={(event) => {
                    event.preventDefault();
                    setFavorited((value) => !value);
                  }}
                  className="inline-flex h-8 cursor-pointer items-center justify-center rounded-lg px-2 text-sm text-muted-foreground transition-all duration-200 hover:text-red-500"
                >
                  <Heart
                    className={`h-3.5 w-3.5 ${favorited ? "fill-red-500 text-red-500" : ""}`}
                    aria-hidden
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
