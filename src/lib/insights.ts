import fs from "fs";
import path from "path";

export type InsightArticleMeta = {
  slug: string;
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  category: string;
};

export type InsightArticle = InsightArticleMeta & {
  content: string;
  readingMinutes: number;
};

const INSIGHTS_DIR = path.join(process.cwd(), "content/insights");

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };

  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const m = line.match(/^([\w-]+):\s*(.*)$/);
    if (m) meta[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return { meta, body: match[2].trim() };
}

function parseTags(raw?: string): string[] {
  if (!raw) return [];
  return raw.split(",").map((t) => t.trim()).filter(Boolean);
}

function estimateReadingMinutes(text: string): number {
  const chars = text.replace(/\s/g, "").length;
  return Math.max(1, Math.ceil(chars / 400));
}

function toArticle(slug: string, raw: string): InsightArticle {
  const { meta, body } = parseFrontmatter(raw);
  return {
    slug,
    title: meta.title || slug,
    description: meta.description || "",
    author: meta.author || "RuleHub 编辑组",
    publishedAt: meta.publishedAt || "2026-07-09",
    updatedAt: meta.updatedAt,
    tags: parseTags(meta.tags),
    category: meta.category || "洞察",
    content: body,
    readingMinutes: estimateReadingMinutes(body),
  };
}

export function getAllInsightSlugs(): string[] {
  if (!fs.existsSync(INSIGHTS_DIR)) return [];
  return fs
    .readdirSync(INSIGHTS_DIR)
    .filter((f) => f.endsWith(".md") && f.toLowerCase() !== "readme.md")
    .map((f) => f.replace(/\.md$/, ""));
}

export function getInsightBySlug(slug: string): InsightArticle | null {
  const filePath = path.join(INSIGHTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return toArticle(slug, raw);
}

export function getAllInsights(): InsightArticle[] {
  return getAllInsightSlugs()
    .map((slug) => getInsightBySlug(slug))
    .filter((a): a is InsightArticle => a !== null)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getInsightCategories(articles: InsightArticle[]): string[] {
  return [...new Set(articles.map((a) => a.category))];
}
