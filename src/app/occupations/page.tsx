import { OccupationsPageContent } from "@/components/occupations/occupations-page-content";
import { createPageMetadata } from "@/lib/site-seo";

export const metadata = createPageMetadata({
  title: "按职业浏览 Agent Skills",
  description:
    "按美国劳工部 SOC 标准，查找各职业对应的 Agent Skills、自动化能力和工作流技能。",
  path: "/occupations",
});

export default function OccupationsPage() {
  return <OccupationsPageContent />;
}
