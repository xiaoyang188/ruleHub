import type { InsightArticle } from "@/lib/insights";
import { JsonLd } from "@/components/seo/json-ld";
import { getSiteUrl, SITE_NAME } from "@/lib/site-seo";

export function InsightArticleJsonLd({ article }: { article: InsightArticle }) {
  const url = getSiteUrl(`/insights/${article.slug}`);
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    url,
    mainEntityOfPage: url,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      "@type": "Organization",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: getSiteUrl("/icon") },
    },
    keywords: article.tags.join(", "),
    inLanguage: "zh-CN",
  };
  return <JsonLd data={data} />;
}
