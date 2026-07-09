import Link from "next/link";
import { Mail, MapPin, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/catalog-sidebar";
import {
  CONTACT_CHANNELS,
  LEGAL_LAST_UPDATED,
  SITE_CONTACT_EMAIL,
  SITE_OPERATOR,
} from "@/lib/site-contact";
import { createPageMetadata, SITE_URL } from "@/lib/site-seo";

export const metadata = createPageMetadata({
  title: "联系我们",
  description: "联系 RuleHub 运营团队：商务合作、隐私咨询、内容纠错与网站反馈。",
  path: "/contact",
  keywords: ["联系我们", "RuleHub", "联系方式", "商务合作"],
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Breadcrumbs items={[{ label: "联系我们" }]} />

      <header className="mx-auto max-w-3xl border-y border-border py-8 text-center">
        <p className="mb-2 text-sm font-medium text-primary">Contact Us</p>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">联系我们</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          如有网站使用、内容纠错、隐私与数据请求、商务合作或广告投放相关问题，欢迎通过以下方式联系 {SITE_OPERATOR}。
        </p>
      </header>

      <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
        {CONTACT_CHANNELS.map((channel) => (
          <a
            key={channel.label}
            href={channel.href}
            className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50 hover:bg-muted/20"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {channel.label}
            </p>
            <p className="mt-2 text-base font-semibold text-foreground group-hover:text-primary">
              {channel.value}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{channel.description}</p>
          </a>
        ))}
      </div>

      <article className="mx-auto mt-12 max-w-3xl space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section className="space-y-3 rounded-xl border border-border bg-card/50 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Mail className="h-5 w-5 text-primary" />
            邮件联系
          </h2>
          <p>
            请发送邮件至{" "}
            <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="font-medium text-primary hover:underline">
              {SITE_CONTACT_EMAIL}
            </a>
            。建议在主题中注明「内容纠错」「隐私请求」「商务合作」或「网站反馈」，以便我们更快处理。
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>内容纠错：请附上出错页面 URL 与问题说明</li>
            <li>隐私相关：请说明您的请求类型（查询、更正或删除）</li>
            <li>版权投诉：请提供权利证明与涉嫌侵权链接</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Clock className="h-5 w-5 text-primary" />
            响应时间
          </h2>
          <p>
            我们通常会在 <strong className="text-foreground">3–5 个工作日</strong> 内回复。节假日或咨询量较大时可能略有延迟，敬请谅解。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <MapPin className="h-5 w-5 text-primary" />
            运营信息
          </h2>
          <p>
            {SITE_OPERATOR} 运营 RuleHub（{SITE_URL.replace(/^https?:\/\//, "")}），提供 Agent Skills 索引浏览、VibeCoding
            项目鉴赏与 AI 行业资讯聚合服务。RuleHub 为独立社区项目，与 Anthropic、OpenAI、Google 等公司无官方关联。
          </p>
        </section>

        <section className="space-y-3 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground/80">最后更新：{LEGAL_LAST_UPDATED}</p>
          <p>
            更多法律信息请参阅{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              隐私政策
            </Link>
            、
            <Link href="/terms" className="text-primary hover:underline">
              服务条款
            </Link>
            与{" "}
            <Link href="/about" className="text-primary hover:underline">
              关于我们
            </Link>
            。
          </p>
        </section>
      </article>
    </div>
  );
}
