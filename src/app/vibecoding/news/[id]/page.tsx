import { notFound } from "next/navigation";
import { VibecodingNewsArticle } from "@/components/vibecoding/vibecoding-news-article";
import { NewsArticleJsonLd } from "@/components/seo/news-article-json-ld";
import { fetchVibecodingItemById } from "@/lib/vibecoding-api";
import { createPageMetadata } from "@/lib/site-seo";
import { displaySummary, displayTitle } from "@/lib/vibecoding-utils";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isFinite(numId)) {
    return createPageMetadata({ title: "文章未找到", path: "/vibecoding/news", noIndex: true });
  }

  try {
    const item = await fetchVibecodingItemById(numId);
    if (item.type !== "news") {
      return createPageMetadata({ title: "文章未找到", path: "/vibecoding/news", noIndex: true });
    }
    const title = displayTitle(item);
    const summary = displaySummary(item);
    return createPageMetadata({
      title,
      description: summary.slice(0, 160) || `${title} — RuleHub AI 行业动态`,
      path: `/vibecoding/news/${item.id}`,
      openGraphType: "article",
      imageUrl: item.imageUrl || undefined,
      keywords: [...(item.tags || []), "AI 新闻", "Hacker News"],
    });
  } catch {
    return createPageMetadata({ title: "文章未找到", path: "/vibecoding/news", noIndex: true });
  }
}

export default async function VibecodingNewsDetailPage({ params }: PageProps) {
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isFinite(numId)) notFound();

  try {
    const item = await fetchVibecodingItemById(numId);
    if (item.type !== "news") notFound();
    return (
      <>
        <NewsArticleJsonLd item={item} />
        <VibecodingNewsArticle item={item} />
      </>
    );
  } catch {
    notFound();
  }
}
