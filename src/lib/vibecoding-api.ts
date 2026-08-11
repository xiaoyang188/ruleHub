import type { VibecodingItem, VibecodingListResult } from "@/lib/vibecoding-utils";

export type { VibecodingItem, VibecodingListResult } from "@/lib/vibecoding-utils";

interface ZuqiuApiResponse<T> {
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

export async function fetchVibecodingItemById(id: number) {
  const base = getZuqiuApiBase();
  const res = await fetch(`${base}/api/vibecoding/items/${id}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`VibeCoding API HTTP ${res.status}`);
  }

  const json = (await res.json()) as ZuqiuApiResponse<VibecodingItem>;
  if (json.code !== 0 || !json.data) {
    throw new Error(json.message || "条目不存在");
  }

  return json.data;
}
