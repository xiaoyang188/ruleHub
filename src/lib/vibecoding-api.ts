export interface VibecodingItem {
  id: number;
  type: string;
  source: string;
  externalId: string;
  title: string;
  summary: string;
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

export interface ZuqiuApiResponse<T> {
  code: number;
  data: T | null;
  message: string;
}

export function getZuqiuApiBase(): string {
  return (
    process.env.ZUQIU_API_BASE ||
    process.env.NEXT_PUBLIC_ZUQIU_API_BASE ||
    "https://api.yimingyinglou.top"
  ).replace(/\/$/, "");
}

export async function fetchVibecodingItems(params: {
  type?: string;
  source?: string;
  page?: number;
  limit?: number;
  sort?: "score" | "recent";
}): Promise<VibecodingListResult> {
  const sp = new URLSearchParams();
  if (params.type) sp.set("type", params.type);
  if (params.source) sp.set("source", params.source);
  sp.set("page", String(params.page ?? 1));
  sp.set("limit", String(params.limit ?? 20));
  sp.set("sort", params.sort ?? "score");

  const base = getZuqiuApiBase();
  const res = await fetch(`${base}/api/vibecoding/items?${sp}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`VibeCoding API HTTP ${res.status}`);
  }

  const json = (await res.json()) as ZuqiuApiResponse<VibecodingListResult>;
  if (json.code !== 0 || !json.data) {
    throw new Error(json.message || "VibeCoding API 返回错误");
  }

  return json.data;
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
