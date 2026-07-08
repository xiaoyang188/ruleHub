import { notFound } from "next/navigation";
import { VibecodingNewsArticle } from "@/components/vibecoding/vibecoding-news-article";
import { fetchVibecodingItemById } from "@/lib/vibecoding-api";
import { displaySummary, displayTitle } from "@/lib/vibecoding-utils";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isFinite(numId)) {
    return { title: "文章未找到 | RuleHub" };
  }

  try {
    const item = await fetchVibecodingItemById(numId);
    if (item.type !== "news") {
      return { title: "文章未找到 | RuleHub" };
    }
    const title = displayTitle(item);
    const summary = displaySummary(item);
    return {
      title: `${title} | AI 最新消息`,
      description: summary.slice(0, 160) || "RuleHub AI 行业动态",
    };
  } catch {
    return { title: "文章未找到 | RuleHub" };
  }
}

export default async function VibecodingNewsDetailPage({ params }: PageProps) {
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isFinite(numId)) notFound();

  try {
    const item = await fetchVibecodingItemById(numId);
    if (item.type !== "news") notFound();
    return <VibecodingNewsArticle item={item} />;
  } catch {
    notFound();
  }
}
