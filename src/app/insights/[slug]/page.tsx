import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InsightArticleView } from "@/components/insights/insight-article-view";
import { InsightArticleJsonLd } from "@/components/seo/insight-article-json-ld";
import { createPageMetadata } from "@/lib/site-seo";
import { getAllInsightSlugs, getInsightBySlug } from "@/lib/insights";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllInsightSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightBySlug(slug);
  if (!article) return { title: "文章未找到" };

  return createPageMetadata({
    title: article.title,
    description: article.description,
    path: `/insights/${article.slug}`,
    keywords: article.tags,
    openGraphType: "article",
  });
}

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <InsightArticleJsonLd article={article} />
      <InsightArticleView article={article} />
    </>
  );
}
