import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchPageContent } from "@/components/search/search-page-content";
import { createPageMetadata } from "@/lib/site-seo";

export const metadata: Metadata = createPageMetadata({
  title: "搜索 Agent Skills",
  description:
    "在 RuleHub 搜索 Claude Code、Codex、ChatGPT 适用的开源 Agent Skills，支持职业筛选与热度排序。",
  path: "/search",
  keywords: ["搜索 Skills", "Agent Skills", "Claude", "Codex", "Cursor"],
});

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-sm text-muted-foreground">
          加载搜索…
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
