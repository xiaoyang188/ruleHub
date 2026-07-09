import { VibecodingNewsPageContent } from "@/components/vibecoding/vibecoding-news-page-content";
import { createPageMetadata } from "@/lib/site-seo";

export const metadata = createPageMetadata({
  title: "AI 最新消息",
  description:
    "追踪 AI、LLM、Agent 相关的 Hacker News 热点新闻与讨论，RuleHub 站内阅读摘要与全文。",
  path: "/vibecoding/news",
  keywords: ["AI 新闻", "LLM", "Hacker News", "人工智能", "行业动态"],
});

export default function VibecodingNewsPage() {
  return <VibecodingNewsPageContent />;
}
