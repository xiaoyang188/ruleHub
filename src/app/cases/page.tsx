import { Breadcrumbs } from "@/components/layout/catalog-sidebar";
import { CasesPageContent } from "@/components/cases/cases-page-content";
import { createPageMetadata } from "@/lib/site-seo";

export const metadata = createPageMetadata({
  title: "案例展示",
  description:
    "杨少威的个人案例展示：搂团、懂球通、开普森、百胜商城、古东巴、RuleHub 等前端多端与全栈落地项目。",
  path: "/cases",
  keywords: ["案例展示", "作品集", "uni-app", "小程序", "前端", "杨少威", "RuleHub"],
});

export default function CasesPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "案例展示" }]} />
      </div>
      <CasesPageContent />
    </>
  );
}
