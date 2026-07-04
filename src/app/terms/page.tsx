import { Breadcrumbs } from "@/components/layout/catalog-sidebar";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Breadcrumbs items={[{ label: "服务条款" }]} />

      <article className="mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-muted-foreground">
        <header className="border-b border-border pb-6">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">服务条款</h1>
          <p className="mt-3">最后更新：2026-07-01</p>
        </header>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">服务说明</h2>
          <p>
            RuleHub 提供 Agent Skills 索引与浏览服务。所有 skills 均来自第三方 GitHub
            仓库，RuleHub 不对其内容、安全性或可用性作任何保证。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">用户责任</h2>
          <p>
            安装任何 skill 前，您应自行审查源代码。因使用第三方 skills 导致的任何损失，RuleHub
            不承担责任。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">API 使用</h2>
          <p>
            调用搜索 API 须遵守速率限制。滥用、爬虫过载或恶意请求可能导致访问受限。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">免责声明</h2>
          <p>
            RuleHub 与 Anthropic、OpenAI 或任何 AI 公司均无关联。服务按「现状」提供。
          </p>
        </section>
      </article>
    </div>
  );
}
