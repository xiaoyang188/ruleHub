import { Breadcrumbs } from "@/components/layout/catalog-sidebar";

const TIMELINE = [
  { date: "2026-06", title: "索引突破 200 万", desc: "Skills 总量超过 2,082,862 条" },
  { date: "2026-05", title: "职业分类扩展", desc: "SOC 867 职位标签覆盖率达 81%" },
  { date: "2026-04", title: "API v1 发布", desc: "开放 REST 搜索接口与 API Key 配额" },
  { date: "2026-03", title: "Codex Skills 目录", desc: "专项 Codex 浏览与筛选上线" },
  { date: "2026-02", title: "Claude Skills 目录", desc: "SKILL.md 生态首个专项入口" },
];

export default function TimelinePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Breadcrumbs items={[{ label: "洞察 · 时间线" }]} />

      <header className="mx-auto max-w-3xl border-y border-border py-8 text-center">
        <p className="mb-2 text-sm font-medium text-primary">Insights</p>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">时间线</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
          Skills 收录与 RuleHub 产品演进的重要节点
        </p>
      </header>

      <ol className="mx-auto mt-12 max-w-2xl space-y-0">
        {TIMELINE.map((item, index) => (
          <li key={item.date} className="relative flex gap-6 pb-10 last:pb-0">
            {index < TIMELINE.length - 1 && (
              <span
                aria-hidden
                className="absolute left-[5.5rem] top-8 h-full w-px bg-border"
              />
            )}
            <time className="w-20 shrink-0 pt-0.5 text-xs font-semibold tabular-nums text-primary">
              {item.date}
            </time>
            <div className="rounded-xl border border-border bg-card p-4">
              <h2 className="font-semibold text-foreground">{item.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
