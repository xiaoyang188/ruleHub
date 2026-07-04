"use client";

import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { useState } from "react";
import type { Skill } from "@/data/mock";
import { siteFeatures } from "@/lib/site-features";
import { getSkillDetailPath } from "@/lib/skill-url";

function Avatar({ author }: { author: string }) {
  const [failed, setFailed] = useState(false);
  const initial = author.charAt(0).toUpperCase();

  if (failed) {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted/40 text-xs font-semibold">
        {initial}
      </span>
    );
  }

  return (
    <img
      src={`https://github.com/${author}.png?size=64`}
      alt=""
      width={32}
      height={32}
      className="h-8 w-8 shrink-0 rounded-full border border-border bg-muted/40 object-cover"
      onError={() => setFailed(true)}
    />
  );
}

export function SkillRow({
  skill,
  showFavorite = siteFeatures.showFavorites,
  href,
}: {
  skill: Skill;
  showFavorite?: boolean;
  href?: string;
}) {
  const [favorited, setFavorited] = useState(false);
  const detailHref = href ?? getSkillDetailPath(skill);

  return (
    <article className="group relative rounded-xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:gap-5">
        <Avatar author={skill.author} />

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1">
            <Link
              href={detailHref}
              className="text-base font-semibold text-foreground transition-colors hover:text-primary"
            >
              {skill.name}
            </Link>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-star text-star" />
              {skill.stars}
            </span>
          </div>
          <p className="mb-2 truncate text-xs text-muted-foreground">{skill.repo}</p>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {skill.description}
          </p>
          <time className="mt-2 block text-xs text-muted-foreground">{skill.updatedAt}</time>
        </div>

        {showFavorite && (
          <button
            type="button"
            aria-label={favorited ? "取消收藏" : "添加到收藏"}
            onClick={() => setFavorited((v) => !v)}
            className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground sm:mt-1"
          >
            <Heart
              className={`h-3.5 w-3.5 ${favorited ? "fill-primary text-primary" : ""}`}
            />
            {favorited ? "已收藏" : "添加到收藏"}
          </button>
        )}
      </div>
    </article>
  );
}
