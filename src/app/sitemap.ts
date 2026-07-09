import type { MetadataRoute } from "next";
import { fetchVibecodingItems } from "@/lib/vibecoding-api";
import { getSiteUrl, STATIC_SITEMAP_ROUTES } from "@/lib/site-seo";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = STATIC_SITEMAP_ROUTES.map(
    ({ path, changeFrequency, priority }) => ({
      url: getSiteUrl(path),
      lastModified: now,
      changeFrequency,
      priority,
    })
  );

  let newsEntries: MetadataRoute.Sitemap = [];
  try {
    const data = await fetchVibecodingItems({
      type: "news",
      page: 1,
      limit: 50,
      sort: "recent",
    });
    newsEntries = data.items.map((item) => ({
      url: getSiteUrl(`/vibecoding/news/${item.id}`),
      lastModified: item.publishedAt ? new Date(item.publishedAt) : now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    /* API 不可用时仍输出静态路由 */
  }

  return [...staticEntries, ...newsEntries];
}
