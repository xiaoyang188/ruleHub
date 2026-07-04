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
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-muted/40 text-xs font-semibold">
        {initial}
      </span>
    );
  }

  return (
    <img
      src={`https://github.com/${author}.png?size=72`}
      alt=""
      width={36}
      height={36}
      className="h-9 w-9 shrink-0 rounded-full border border-border bg-muted/40 object-cover"
      onError={() => setFailed(true)}
    />
  );
}

export function SearchSkillRow({
  skill,
  href,
  query,
}: {
  skill: Skill;
  href?: string;
  query?: string;
}) {
  const [favorited, setFavorited] = useState(false);
  const detailHref = href ?? getSkillDetailPath(skill);

  const highlight = (text: string) => {
    if (!query?.trim()) return text;
    const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="rounded bg-primary/20 px-0.5 text-foreground">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <article className="group relative rounded-xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex items-start gap-4 p-4">
        <Link href={detailHref} className="shrink-0">
          <Avatar author={skill.author} />
        </Link>

        <Link href={detailHref} className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className="text-sm font-semibold text-foreground group-hover:text-primary">
              {highlight(skill.name)}
            </h3>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-star text-star" />
              {skill.stars}
            </span>
          </div>
          <p className="mb-1 truncate text-xs text-muted-foreground">{skill.repo}</p>
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {skill.description}
          </p>
          <time className="mt-2 block text-[11px] text-muted-foreground">{skill.updatedAt}</time>
        </Link>

        {siteFeatures.showFavorites && (
          <button
            type="button"
            aria-label={favorited ? "取消收藏" : "添加到收藏"}
            onClick={(e) => {
              e.preventDefault();
              setFavorited((v) => !v);
            }}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          >
            <Heart className={`h-3.5 w-3.5 ${favorited ? "fill-primary text-primary" : ""}`} />
            <span className="hidden sm:inline">{favorited ? "已收藏" : "添加到收藏"}</span>
          </button>
        )}
      </div>
    </article>
  );
}
