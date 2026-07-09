import { CreatorsPageContent } from "@/components/creators/creators-page-content";
import { createPageMetadata } from "@/lib/site-seo";

export const metadata = createPageMetadata({
  title: "创作者排行",
  description: "浏览 RuleHub 上贡献 Agent Skills 最多的 GitHub 创作者与仓库排行。",
  path: "/creators",
});

export default function CreatorsPage() {
  return <CreatorsPageContent />;
}
