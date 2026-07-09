import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/catalog-sidebar";
import { PrimaryCtaLink } from "@/components/ui/site-chrome";
import { SITE_CONTACT_EMAIL, SITE_OPERATOR } from "@/lib/site-contact";
import { STATS } from "@/data/mock";
import { createPageMetadata, SITE_NAME, SITE_URL } from "@/lib/site-seo";

export const metadata = createPageMetadata({
  title: "关于 RuleHub",
  description: "了解 RuleHub — Agent Skills 市场、VibeCoding 项目鉴赏与 AI 行业资讯聚合平台。",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Breadcrumbs items={[{ label: "关于我们" }]} />

      <header className="mx-auto max-w-3xl border-y border-border py-8 text-center">
        <p className="mb-2 text-sm font-medium text-primary">独立社区项目</p>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">关于 {SITE_NAME}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {SITE_NAME} 是面向开发者的 Agent Skills 发现平台，同时聚合 VibeCoding 开源项目与 AI
          行业资讯，帮助你在 Claude Code、Codex、Cursor 等工具生态中更快找到可用能力。
        </p>
      </header>

      <article className="mx-auto mt-12 max-w-3xl space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">我们是谁</h2>
          <p>
            {SITE_NAME} 由 {SITE_OPERATOR} 维护，网站地址为 {SITE_URL.replace(/^https?:\/\//, "")}。
            我们致力于整理 GitHub 上公开的 SKILL.md 技能包，并提供搜索、职业分类、创作者排行等工具，降低开发者发现与评估
            Skills 的成本。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">我们提供什么</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Agent Skills 目录：</strong>
              索引 GitHub 开源 SKILL.md，支持搜索、分类与创作者浏览。当前展示约 {STATS.totalSkills}{" "}
              条 skills。
            </li>
            <li>
              <strong className="text-foreground">VibeCoding 鉴赏：</strong>
              聚合 Hacker News Show HN 上的 AI 编程相关项目。
            </li>
            <li>
              <strong className="text-foreground">AI 最新消息：</strong>
              筛选 AI、LLM、Agent 相关的行业新闻与讨论，提供站内阅读与原文链接。
            </li>
            <li>
              <strong className="text-foreground">文档与指南：</strong>
              Skills 使用说明、API 文档与规范参考。
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">内容来源与编辑政策</h2>
          <p>
            Skills 元数据来自公开 GitHub 仓库；新闻资讯来自 Hacker News 等公开渠道，我们在站内提供摘要或全文阅读，并始终保留指向原文的链接。
            我们持续发布原创教程与行业解读（见网站「洞察」等栏目），以补充索引内容、为用户提供额外价值。
          </p>
          <p>
            若您发现内容错误或侵权，请通过{" "}
            <Link href="/contact" className="text-primary hover:underline">
              联系我们
            </Link>{" "}
            或 {SITE_CONTACT_EMAIL} 反馈，我们会尽快核实处理。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">广告与盈利</h2>
          <p>
            为维持服务器与开发成本，{SITE_NAME} 可能展示第三方广告（如 Google AdSense）。广告不影响我们的索引中立性；Skills
            排序基于公开指标（如 stars、更新时间），而非商业合作。详见{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              隐私政策
            </Link>
            。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">免责声明</h2>
          <p>
            {SITE_NAME} 与 Anthropic、OpenAI、Google 或任何 AI 公司均无官方关联。所有 Skills
            来自第三方公开仓库，安装前请自行审查代码安全性与许可证。本网站内容仅供参考，不构成专业建议。
          </p>
        </section>

        <section className="flex flex-wrap gap-3 pt-4">
          <PrimaryCtaLink href="/skills">浏览目录</PrimaryCtaLink>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3.5 text-sm font-semibold transition-colors hover:border-primary/50"
          >
            联系我们
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </article>
    </div>
  );
}
