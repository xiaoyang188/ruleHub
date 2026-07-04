import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchPageContent } from "@/components/search/search-page-content";

export const metadata: Metadata = {
  title: "搜索 Agent Skills | RuleHub",
  description: "在 RuleHub 搜索开源 Agent Skills",
};

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
