import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/catalog-sidebar";
import { InsightsGrid } from "@/components/insights/insight-card";
import { createPageMetadata } from "@/lib/site-seo";
import { getAllInsights, getInsightCategories } from "@/lib/insights";

export const metadata: Metadata = createPageMetadata({
  title: "洞察专栏",
  description:
    "RuleHub 原创深度文章：Agent Skills 入门、SKILL.md 实践、VibeCoding 工作流与 AI 编程工具评测，帮助开发者更高效地使用 AI 助手。",
  path: "/insights",
  keywords: ["Agent Skills 教程", "SKILL.md", "AI 编程", "VibeCoding", "Claude Code"],
});

export default function InsightsPage() {
  const articles = getAllInsights();
  const categories = getInsightCategories(articles);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Breadcrumbs items={[{ label: "洞察专栏" }]} />

      <header className="mx-auto max-w-3xl border-y border-border py-8 text-center">
        <p className="mb-2 text-sm font-medium text-primary">Insights</p>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">洞察专栏</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          原创教程、实践指南与工具评测。我们围绕 Agent Skills 生态与 AI 编程工作流，撰写可长期参考的深度内容。
        </p>
        {categories.length > 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            当前栏目：{categories.join(" · ")} · 共 {articles.length} 篇
          </p>
        ) : null}
      </header>

      {articles.length > 0 ? (
        <div className="mt-10">
          <InsightsGrid articles={articles} />
        </div>
      ) : (
        <p className="mt-12 text-center text-muted-foreground">暂无文章，敬请期待。</p>
      )}

      <aside className="mx-auto mt-14 max-w-2xl rounded-xl border border-border bg-muted/10 p-6 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">关于本专栏</p>
        <p className="mt-2 leading-relaxed">
          洞察专栏由 RuleHub 团队独立撰写，聚焦 Skills 检索之外的「方法论」与「落地经验」。
          如需投稿或纠错，请通过{" "}
          <a href="/contact" className="text-primary hover:underline">
            联系我们
          </a>{" "}
          与我们沟通。
        </p>
      </aside>
    </div>
  );
}
