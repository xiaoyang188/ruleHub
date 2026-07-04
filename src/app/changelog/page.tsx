import { Breadcrumbs } from "@/components/layout/catalog-sidebar";

const ENTRIES = [
  { version: "0.3.0", date: "2026-07-01", items: ["搜索页接入 SkillsMP API", "详情页与文档页 1:1 复刻"] },
  { version: "0.2.0", date: "2026-06-15", items: ["Agent Skills 目录页", "分类与职业浏览"] },
  { version: "0.1.0", date: "2026-06-01", items: ["RuleHub 首页上线", "静态路由补齐"] },
];

export default function ChangelogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Breadcrumbs items={[{ label: "更新日志" }]} />

      <header className="mx-auto max-w-3xl border-y border-border py-8 text-center">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">更新日志</h1>
        <p className="mt-4 text-sm text-muted-foreground">RuleHub 产品更新记录</p>
      </header>

      <div className="mx-auto mt-10 max-w-2xl space-y-8">
        {ENTRIES.map((entry) => (
          <section key={entry.version} className="border-b border-border pb-8 last:border-0">
            <div className="mb-3 flex items-baseline gap-3">
              <h2 className="text-lg font-bold text-foreground">v{entry.version}</h2>
              <time className="text-xs text-muted-foreground">{entry.date}</time>
            </div>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              {entry.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
