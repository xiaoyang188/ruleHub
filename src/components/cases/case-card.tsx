"use client";

import { ChevronDown, ExternalLink } from "lucide-react";
import { useState } from "react";
import type { CaseItem } from "@/data/cases";
import { cn } from "@/lib/utils";

function PhoneMockup({ item }: { item: CaseItem }) {
  return (
    <div className="relative mx-auto h-[168px] w-[92px] sm:h-[180px] sm:w-[98px]">
      <div className="absolute inset-0 rounded-[1.35rem] border-[3px] border-black/80 bg-black/90 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.65)]">
        <div className="absolute left-1/2 top-1.5 h-1.5 w-10 -translate-x-1/2 rounded-full bg-black/70" />
        <div
          className="absolute inset-[6px] overflow-hidden rounded-[1.05rem]"
          style={{
            background: `linear-gradient(160deg, ${item.accentColor}33, transparent 55%), #0b1220`,
          }}
        >
          <div className="flex h-6 items-center justify-between px-2.5 pt-1">
            <span className="text-[8px] font-semibold text-white/80">9:41</span>
            <span className="h-1.5 w-4 rounded-sm bg-white/35" />
          </div>
          <div className="px-2.5 pt-1">
            <p className="text-[11px] font-bold tracking-wide text-white">{item.mockTitle}</p>
            <div className="mt-2 space-y-1.5">
              {item.mockLines.map((line) => (
                <div
                  key={line}
                  className="rounded-md border border-white/10 bg-white/10 px-2 py-1 text-[8px] leading-tight text-white/85"
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CaseCard({ item }: { item: CaseItem }) {
  const [open, setOpen] = useState(false);

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card",
        "transition-all duration-300 hover:-translate-y-1 hover:border-primary/45",
        "hover:shadow-[0_20px_50px_-24px_rgba(217,145,120,0.45)]"
      )}
    >
      <div
        className="relative overflow-hidden border-b border-border/60 px-4 pb-4 pt-5"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${item.accentColor}55, transparent 55%), linear-gradient(145deg, ${item.themeColor}, color-mix(in srgb, ${item.themeColor} 70%, #000))`,
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-6 top-3 text-5xl font-black tracking-tight text-white/10"
        >
          {item.mockTitle.slice(0, 2)}
        </div>
        <PhoneMockup item={item} />
        {item.featured ? (
          <span className="absolute bottom-3 right-3 rounded bg-rose-600 px-2 py-0.5 text-[11px] font-bold tracking-wide text-white shadow-sm">
            精品
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-base font-semibold text-foreground group-hover:text-primary">
              {item.name}
            </h2>
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                aria-label={`打开 ${item.name}`}
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : null}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{item.subtitle}</p>
        </div>

        <dl className="space-y-1.5 text-xs leading-relaxed text-muted-foreground">
          <div className="flex gap-2">
            <dt className="w-[4.5rem] shrink-0 text-foreground/70">开发语言：</dt>
            <dd>{item.languages.join(" + ")}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-[4.5rem] shrink-0 text-foreground/70">项目端口：</dt>
            <dd>{item.terminals.join(" / ")}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-[4.5rem] shrink-0 text-foreground/70">是否运营：</dt>
            <dd>{item.operating ? "是" : "否"}</dd>
          </div>
        </dl>

        {item.tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border bg-muted/30 px-2 py-0.5 text-[11px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-auto border-t border-border/60 pt-3">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-muted/20 px-3 py-2 text-left text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
            aria-expanded={open}
          >
            <span>{open ? "收起亮点" : "展开亮点"}</span>
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 text-muted-foreground transition-transform",
                open && "rotate-180"
              )}
            />
          </button>
          {open ? (
            <ul className="mt-3 space-y-2">
              {item.highlights.map((point) => (
                <li
                  key={point}
                  className="flex gap-2 text-xs leading-relaxed text-muted-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </article>
  );
}
