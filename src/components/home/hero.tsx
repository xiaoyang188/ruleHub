import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Newspaper, Search, Sparkles, Users } from "lucide-react";
import { STATS } from "@/data/mock";
import { HeroCtaPanel } from "@/components/home/hero-cta-panel";
import { HeroDecorations } from "@/components/ui/site-chrome";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <HeroDecorations />
      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,440px)] lg:items-center">
          <div className="min-w-0">
            <div className="flex max-w-2xl items-center gap-3 text-xs font-semibold uppercase text-muted-foreground">
              <span className="h-px w-10 shrink-0 bg-primary" aria-hidden />
              <span className="truncate">RuleHub / Skills Marketplace</span>
            </div>

            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.96] tracking-normal text-foreground sm:text-6xl lg:text-7xl">
              Agent{" "}
              <span className="relative inline-block whitespace-nowrap">
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-[0.08em] h-[0.22em] bg-primary/18"
                />
                <span className="relative text-foreground/92">Skills Marketplace</span>
              </span>
            </h1>

            <div className="mt-5 hidden max-w-3xl border-l border-border/70 pl-4 sm:block sm:pl-5">
              <p className="text-lg leading-8 text-muted-foreground lg:text-xl">
                发现适用于 Claude Code、Codex、ChatGPT 以及所有 SKILL.md 工具的开源 agent
                skills
              </p>
            </div>

            <p className="mt-4 hidden max-w-2xl text-base leading-7 text-muted-foreground sm:block">
              从关键词、职业、创作者和 GitHub 来源进入，看看不同领域正在生成什么样的 skills
            </p>

            <div className="mt-7 max-w-xl border-y border-border/65 py-4">
              <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
                <span
                  className="h-2 w-2 shrink-0 translate-y-[-0.55rem] bg-primary"
                  aria-hidden
                />
                <span className="min-w-0 truncate font-mono text-3xl font-semibold leading-none tracking-normal text-foreground sm:text-4xl">
                  {STATS.totalSkills}
                </span>
                <span className="pb-1 text-sm leading-5 text-muted-foreground">
                  已收集的 SKILL.md 文件
                </span>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-2 items-stretch gap-3 lg:hidden">
              <Link
                href="/search"
                className="col-span-2 inline-flex min-h-11 min-w-0 overflow-hidden rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
              >
                <span className="flex min-w-0 items-center justify-center gap-2">
                  <Search className="h-4 w-4 shrink-0" />
                  <span className="min-w-0 break-words text-center leading-5 [overflow-wrap:anywhere]">
                    搜索 Skills
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </span>
              </Link>
              <Link
                href="/vibecoding"
                className="inline-flex min-h-11 min-w-0 overflow-hidden rounded-md border border-border bg-card/70 px-3 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-muted/60 sm:px-5"
              >
                <span className="flex min-w-0 items-center justify-center gap-2">
                  <Sparkles className="h-4 w-4 shrink-0 text-primary" />
                  <span className="min-w-0 break-words text-center leading-5 [overflow-wrap:anywhere]">
                    VibeCoding
                  </span>
                </span>
              </Link>
              <Link
                href="/vibecoding/news"
                className="inline-flex min-h-11 min-w-0 overflow-hidden rounded-md border border-border bg-card/70 px-3 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-muted/60 sm:px-5"
              >
                <span className="flex min-w-0 items-center justify-center gap-2">
                  <Newspaper className="h-4 w-4 shrink-0 text-amber-500" />
                  <span className="min-w-0 break-words text-center leading-5 [overflow-wrap:anywhere]">
                    AI 消息
                  </span>
                </span>
              </Link>
              <Link
                href="/creators"
                className="inline-flex min-h-11 min-w-0 overflow-hidden rounded-md border border-border bg-card/70 px-3 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-muted/60 sm:px-5"
              >
                <span className="flex min-w-0 items-center justify-center gap-2">
                  <Users className="h-4 w-4 shrink-0" />
                  <span className="min-w-0 break-words text-center leading-5 [overflow-wrap:anywhere]">
                    浏览创作者
                  </span>
                </span>
              </Link>
              <Link
                href="/occupations"
                className="inline-flex min-h-11 min-w-0 overflow-hidden rounded-md border border-border bg-card/70 px-3 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-muted/60 sm:px-5"
              >
                <span className="flex min-w-0 items-center justify-center gap-2">
                  <BriefcaseBusiness className="h-4 w-4 shrink-0" />
                  <span className="min-w-0 break-words text-center leading-5 [overflow-wrap:anywhere]">
                    按职业探索
                  </span>
                </span>
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <HeroCtaPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
