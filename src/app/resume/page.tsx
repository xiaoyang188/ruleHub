import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/catalog-sidebar";
import { ResumeView } from "@/components/resume/resume-view";
import { siteFeatures } from "@/lib/site-features";
import { createPageMetadata } from "@/lib/site-seo";

export const metadata = createPageMetadata({
  title: "个人简历 · 杨少威",
  description:
    "杨少威的个人简历：前端工程师，擅长 uni-app / 小程序 / Nuxt 多端落地，项目含搂团、懂球通、开普森、百胜商城、古东巴与 RuleHub。",
  path: "/resume",
  keywords: ["简历", "杨少威", "前端工程师", "uni-app", "小程序", "RuleHub"],
  noIndex: !siteFeatures.showResume,
});

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="print:hidden">
        <Breadcrumbs items={[{ label: "个人简历" }]} />
      </div>

      <header className="mx-auto mb-8 max-w-3xl border-y border-border py-8 text-center print:hidden">
        <p className="mb-2 text-sm font-medium text-primary">Resume</p>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">个人简历</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          站长杨少威的在线简历。可直接浏览，也可一键导出 PDF。更完整的项目卡片见{" "}
          <Link href="/cases" className="font-medium text-primary hover:underline">
            案例展示
          </Link>
          。
        </p>
      </header>

      <ResumeView />
    </div>
  );
}
