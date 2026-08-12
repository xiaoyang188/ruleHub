import { Breadcrumbs } from "@/components/layout/catalog-sidebar";
import { ResumeView } from "@/components/resume/resume-view";
import { siteFeatures } from "@/lib/site-features";
import { createPageMetadata } from "@/lib/site-seo";

export const metadata = createPageMetadata({
  title: "个人简历 · 小杨",
  description:
    "小杨的个人简历：独立开发者，熟练使用 Cursor，拥有 RuleHub、zuqiu 等项目经验，随时到岗。",
  path: "/resume",
  keywords: ["简历", "小杨", "Cursor", "独立开发", "RuleHub"],
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
          站长小杨的在线简历。可直接浏览，也可一键导出 PDF。
        </p>
      </header>

      <ResumeView />
    </div>
  );
}
