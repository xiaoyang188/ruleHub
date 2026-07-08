import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CodeXml,
  Newspaper,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { STATS } from "@/data/mock";
import { siteFeatures } from "@/lib/site-features";
import { cn } from "@/lib/utils";

function CtaTile({
  href,
  icon: Icon,
  iconClassName,
  label,
}: {
  href: string;
  icon: typeof Search;
  iconClassName: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group flex min-h-24 min-w-0 flex-col justify-between rounded-md border border-border bg-muted/20 p-4 transition-colors hover:border-primary/55 hover:bg-background"
    >
      <span className="flex items-center justify-between gap-3">
        <Icon className={cn("h-4 w-4 shrink-0", iconClassName)} />
        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
      </span>
      <span className="text-sm font-semibold leading-5 text-foreground">{label}</span>
    </Link>
  );
}

export function HeroCtaPanel() {
  return (
    <div className="relative min-w-0">
      <div
        aria-hidden
        className="absolute -left-6 top-8 hidden h-[calc(100%-4rem)] w-6 border-y border-l border-border/70 lg:block"
      />
      <div className="relative overflow-hidden rounded-md border border-border bg-card shadow-[0_22px_70px_-52px_rgba(17,24,39,0.72)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35] hero-dot-grid"
        />
        <div className="relative grid gap-3 px-4 py-4">
          <Link
            href="/search"
            className="group flex min-w-0 items-center justify-between gap-3 rounded-md border border-border bg-background px-4 py-3 transition-colors hover:border-primary/60"
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-card text-primary">
                <Search className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold leading-5 text-foreground">
                  搜索 Skills
                </span>
                <span className="mt-0.5 block truncate text-xs leading-5 text-muted-foreground">
                  搜索 {STATS.totalSkills} 个 skills：试试 &apos;AI 视频&apos;、&apos;数据分析&apos;、&apos;code review&apos;...
                </span>
              </span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
          </Link>

          {siteFeatures.showApiDocs && (
            <Link
              href="/docs/api"
              className="group flex min-w-0 flex-col gap-4 rounded-md border border-border bg-muted/20 p-4 transition-colors hover:border-primary/55 hover:bg-background"
            >
              <span className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase text-primary">
                  <CodeXml className="h-4 w-4" />
                  API
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold leading-5 text-foreground">
                  把同一份目录数据接入你的工具
                </span>
                <span className="mt-2 block text-xs leading-5 text-muted-foreground">
                  通过 REST API 使用 {STATS.totalSkills} 个公开 skills，用在自己的搜索、分析或 agent 工作流里。
                </span>
              </span>
              <span className="text-xs font-semibold uppercase text-primary">
                查看 API 文档
              </span>
            </Link>
          )}

          <div className="grid grid-cols-2 gap-3">
            <CtaTile
              href="/vibecoding"
              icon={Sparkles}
              iconClassName="text-primary"
              label="VibeCoding"
            />
            <CtaTile
              href="/vibecoding/news"
              icon={Newspaper}
              iconClassName="text-amber-500 dark:text-amber-400"
              label="AI 最新消息"
            />
            <CtaTile
              href="/creators"
              icon={Users}
              iconClassName="text-blue-500 dark:text-blue-400"
              label="浏览创作者"
            />
            <CtaTile
              href="/occupations"
              icon={BriefcaseBusiness}
              iconClassName="text-emerald-500 dark:text-emerald-400"
              label="按职业探索"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
