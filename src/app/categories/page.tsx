import { CategoriesPageContent } from "@/components/categories/categories-page-content";
import { createPageMetadata } from "@/lib/site-seo";

export const metadata = createPageMetadata({
  title: "按分类浏览 Agent Skills",
  description:
    "按分类探索 Claude Code、Codex 与 ChatGPT 的 Agent Skills，查找开发工具、测试、数据、文档和工作流技能。",
  path: "/categories",
});

export default function CategoriesPage() {
  return <CategoriesPageContent />;
}
