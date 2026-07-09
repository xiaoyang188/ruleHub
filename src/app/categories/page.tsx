import { CategoriesPageContent } from "@/components/categories/categories-page-content";
import { createPageMetadata } from "@/lib/site-seo";

export const metadata = createPageMetadata({
  title: "Skills 分类",
  description: "按工具、开发、商业等领域浏览 Agent Skills 分类目录。",
  path: "/categories",
});

export default function CategoriesPage() {
  return <CategoriesPageContent />;
}
