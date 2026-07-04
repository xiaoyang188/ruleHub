import type { Skill } from "@/data/mock";
import { resolveOccupationApiSlug } from "@/lib/occupation-slugs";

export interface SkillsMpSkill {
  id: string;
  name: string;
  author: string;
  description: string;
  githubUrl: string;
  skillUrl: string;
  stars: number;
  updatedAt: string;
}

export interface SkillsMpSearchResponse {
  success: boolean;
  error?: { code?: string; message?: string };
  data?: {
    skills: SkillsMpSkill[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
    filters?: { search?: string; sortBy?: string };
  };
}

export type SearchSkill = Skill & { detailHref?: string };

export const DEFAULT_BROWSE_QUERY = "skill";

function buildApiHeaders(): HeadersInit {
  const headers: HeadersInit = { Accept: "application/json" };
  const apiKey = process.env.SKILLSMP_API_KEY;
  if (apiKey) {
    headers.Authorization = `Bearer ${apiKey}`;
  }
  return headers;
}

/** SkillsMP requires `q`; pick a sensible default when browsing without keywords. */
export function resolveBrowseQuery(options: {
  q?: string;
  category?: string;
}): string {
  const trimmed = options.q?.trim();
  if (trimmed) return trimmed;
  if (options.category) return options.category;
  return DEFAULT_BROWSE_QUERY;
}

export function formatStars(stars: number): string {
  if (stars >= 1_000_000) return `${(stars / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (stars >= 1_000) return `${(stars / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(stars);
}

export function formatUpdatedAt(ts: string): string {
  const n = Number(ts);
  if (!Number.isFinite(n) || n <= 0) return ts;
  return new Date(n * 1000).toISOString().slice(0, 10);
}

export function parseRepoFromGithubUrl(url: string): string {
  const match = url.match(/github\.com\/([^/]+\/[^/]+)/);
  return match?.[1] ?? url;
}

export function parseDetailPath(skillUrl: string): string {
  try {
    const pathname = new URL(skillUrl).pathname;
    if (pathname.startsWith("/zh/")) return pathname.slice(3);
    return pathname;
  } catch {
    return "#";
  }
}

export function mapApiSkill(skill: SkillsMpSkill): SearchSkill {
  return {
    id: skill.id,
    name: skill.name,
    author: skill.author,
    repo: parseRepoFromGithubUrl(skill.githubUrl),
    description: skill.description,
    stars: formatStars(skill.stars),
    updatedAt: formatUpdatedAt(skill.updatedAt),
    detailHref: parseDetailPath(skill.skillUrl),
  };
}

async function fetchSkillsFromApi(sp: URLSearchParams) {
  const res = await fetch(`https://skillsmp.com/api/v1/skills/search?${sp}`, {
    headers: buildApiHeaders(),
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    const json = (await res.json().catch(() => null)) as SkillsMpSearchResponse | null;
    throw new Error(json?.error?.code ?? `SkillsMP API ${res.status}`);
  }

  const json = (await res.json()) as SkillsMpSearchResponse;
  if (!json.success || !json.data) {
    throw new Error(json.error?.code ?? "Invalid API response");
  }

  return json.data;
}

export async function browseSkills(params: {
  page?: number;
  limit?: number;
  sortBy?: "stars" | "recent";
  category?: string;
  occupation?: string;
  q?: string;
}): Promise<{ skills: SearchSkill[]; total: number; fromApi: boolean; hasNext: boolean }> {
  const sp = new URLSearchParams();
  sp.set("q", resolveBrowseQuery({ q: params.q, category: params.category }));
  sp.set("limit", String(params.limit ?? 12));
  sp.set("page", String(params.page ?? 1));
  if (params.sortBy) sp.set("sortBy", params.sortBy);
  if (params.category) sp.set("category", params.category);
  if (params.occupation) {
    sp.set("occupation", resolveOccupationApiSlug(params.occupation));
  }

  try {
    const data = await fetchSkillsFromApi(sp);
    return {
      skills: data.skills.map(mapApiSkill),
      total: data.pagination.total,
      fromApi: true,
      hasNext: data.pagination.hasNext,
    };
  } catch {
    return { skills: [], total: 0, fromApi: false, hasNext: false };
  }
}

export async function searchSkills(params: {
  q: string;
  page?: number;
  limit?: number;
  sortBy?: "stars" | "recent";
  category?: string;
  occupation?: string;
}): Promise<{ skills: SearchSkill[]; total: number; fromApi: boolean; hasNext: boolean }> {
  const sp = new URLSearchParams();
  sp.set("q", params.q.trim());
  sp.set("limit", String(params.limit ?? 12));
  sp.set("page", String(params.page ?? 1));
  if (params.sortBy) sp.set("sortBy", params.sortBy);
  if (params.category) sp.set("category", params.category);
  if (params.occupation) {
    sp.set("occupation", resolveOccupationApiSlug(params.occupation));
  }

  try {
    const data = await fetchSkillsFromApi(sp);
    return {
      skills: data.skills.map(mapApiSkill),
      total: data.pagination.total,
      fromApi: true,
      hasNext: data.pagination.hasNext,
    };
  } catch {
    return { skills: [], total: 0, fromApi: false, hasNext: false };
  }
}

/** Fetch featured / hot skills for static sections. Falls back to empty on API failure. */
export async function getFeaturedSkills(limit = 9): Promise<SearchSkill[]> {
  const result = await browseSkills({ limit, sortBy: "stars" });
  return result.skills;
}
