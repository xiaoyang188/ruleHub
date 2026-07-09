import { OccupationsPageContent } from "@/components/occupations/occupations-page-content";
import { createPageMetadata } from "@/lib/site-seo";

export const metadata = createPageMetadata({
  title: "职业技能分类",
  description: "按 SOC 职业领域浏览 Agent Skills，找到适合你岗位的 Claude / Codex 技能包。",
  path: "/occupations",
});

export default function OccupationsPage() {
  return <OccupationsPageContent />;
}
