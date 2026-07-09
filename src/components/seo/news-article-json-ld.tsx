import type { VibecodingItem } from "@/lib/vibecoding-utils";
import { displaySummary, displayTitle } from "@/lib/vibecoding-utils";
import { JsonLd } from "@/components/seo/json-ld";
import { getSiteUrl, SITE_NAME } from "@/lib/site-seo";

export function NewsArticleJsonLd({ item }: { item: VibecodingItem }) {
  const title = displayTitle(item);
  const summary = displaySummary(item);
  const url = getSiteUrl(`/vibecoding/news/${item.id}`);

  const data = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description: summary || title,
    url,
    mainEntityOfPage: url,
    datePublished: item.publishedAt || undefined,
    dateModified: item.syncedAt || item.publishedAt || undefined,
    author: item.author
      ? { "@type": "Person", name: item.author }
      : { "@type": "Organization", name: "Hacker News" },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: getSiteUrl("/icon") },
    },
    image: item.imageUrl || undefined,
    isAccessibleForFree: true,
  };

  return <JsonLd data={data} />;
}
