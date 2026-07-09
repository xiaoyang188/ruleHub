import { VibecodingPageContent } from "@/components/vibecoding/vibecoding-page-content";
import { createPageMetadata } from "@/lib/site-seo";

export const metadata = createPageMetadata({
  title: "VibeCoding 鉴赏",
  description:
    "发现 Hacker News 上最新的 AI 编程项目、Agent 工具与 Vibe Coding 灵感，按热度或最新排序浏览。",
  path: "/vibecoding",
  keywords: ["VibeCoding", "Show HN", "AI 项目", "Agent", "开源项目"],
});

export default function VibecodingPage() {
  return <VibecodingPageContent />;
}
