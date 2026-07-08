export interface VibecodingItem {
  id: number;
  type: string;
  source: string;
  externalId: string;
  title: string;
  titleEn?: string;
  titleZh?: string;
  summary: string;
  summaryEn?: string;
  summaryZh?: string;
  url: string;
  imageUrl: string;
  author: string;
  score: number;
  commentCount: number;
  tags: string[];
  publishedAt: string | null;
  syncedAt: string | null;
  isFeatured: boolean;
}

export interface VibecodingListResult {
  items: VibecodingItem[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
}

export function sourceLabel(source: string): string {
  switch (source) {
    case "hn":
      return "Hacker News";
    case "github":
      return "GitHub";
    case "manual":
      return "精选";
    default:
      return source;
  }
}

export function decodeHtmlText(text: string): string {
  if (!text) return "";
  return text
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
      try {
        return String.fromCodePoint(parseInt(hex, 16));
      } catch {
        return "";
      }
    })
    .replace(/&#(\d+);/g, (_, num) => {
      try {
        return String.fromCodePoint(Number(num));
      } catch {
        return "";
      }
    })
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'");
}

export function extractDomain(url: string): string {
  if (!url) return "";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export function getPreviewCandidates(
  item: Pick<VibecodingItem, "url" | "imageUrl" | "author">
): string[] {
  const list: string[] = [];
  if (item.imageUrl) list.push(item.imageUrl);

  const domain = extractDomain(item.url);
  if (domain === "github.com") {
    try {
      const owner = new URL(item.url).pathname.split("/").filter(Boolean)[0];
      if (owner) list.push(`https://github.com/${owner}.png?size=128`);
    } catch {
      /* ignore */
    }
  }

  if (domain) list.push(`https://icons.duckduckgo.com/ip3/${domain}.ico`);
  if (item.author) list.push(`https://github.com/${item.author}.png?size=128`);

  return [...new Set(list.filter(Boolean))];
}

export function formatRelativeTime(iso: string | null): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const diffMs = Date.now() - date.getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  if (hours < 1) return "刚刚";
  if (hours < 24) return `${hours} 小时前`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} 天前`;
  return date.toISOString().slice(0, 10);
}

export function displayTitle(item: VibecodingItem): string {
  const raw = decodeHtmlText(item.titleZh || item.title || item.titleEn || "");
  return raw.replace(/^(Show HN|显示\s*HN)[：:\s]*/i, "").trim() || raw;
}

export function displaySummary(item: VibecodingItem): string {
  return decodeHtmlText(item.summaryZh || item.summary || item.summaryEn || "");
}

export function getNewsArticlePath(id: number): string {
  return `/vibecoding/news/${id}`;
}

export function getHnDiscussionUrl(
  item: Pick<VibecodingItem, "source" | "externalId">
): string | null {
  if (item.source !== "hn" || !item.externalId) return null;
  return `https://news.ycombinator.com/item?id=${item.externalId}`;
}
