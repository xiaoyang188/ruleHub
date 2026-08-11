import type { Metadata } from "next";
import { FaqDocsView } from "@/components/docs/faq-docs-view";
import { DocsLayout } from "@/components/docs/docs-layout";
import { getFaqDocCount } from "@/data/faq-docs";
import { createPageMetadata } from "@/lib/site-seo";

export const metadata: Metadata = createPageMetadata({
  title: "Agent Skills 常见问题解答",
  description:
    "查找关于 Agent Skills 的常见问题解答。了解安装方法、技能质量评估、Skills 与 Commands 的区别，以及如何开始使用 RuleHub。",
  path: "/docs/faq",
});

export default function DocsFaqPage() {
  return (
    <DocsLayout
      title="常见问题"
      description="关于 Agent Skills 和 RuleHub 的常见问题"
      breadcrumbs={[
        { label: "文档", href: "/docs" },
        { label: "FAQ" },
      ]}
    >
      <FaqDocsView />
      <p className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
        共 {getFaqDocCount()} 个问题 · 没找到答案？{" "}
        <a href="/contact" className="font-medium text-primary hover:underline">
          联系我们
        </a>
      </p>
    </DocsLayout>
  );
}
