import type { Metadata } from "next";

export const SITE_NAME = "RuleHub";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.yimingyinglou.top"
).replace(/\/$/, "");

export const SITE_DESCRIPTION =
  "RuleHub 是 Agent Skills 市场：发现 Claude Code、Codex、ChatGPT 适用的开源 SKILL.md skills，并聚合 AI 编程项目与行业新闻。";

export const SITE_KEYWORDS = [
  "Agent Skills",
  "SKILL.md",
  "Claude Code",
  "Codex",
  "ChatGPT",
  "Cursor",
  "VibeCoding",
  "AI 编程",
  "开源 Skills",
  "RuleHub",
];

export function getSiteUrl(path = "/"): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetaInput = {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
  openGraphType?: "website" | "article";
  imageUrl?: string;
};

export function createPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  keywords,
  noIndex = false,
  openGraphType = "website",
  imageUrl,
}: PageMetaInput): Metadata {
  const canonical = path.startsWith("/") ? path : `/${path}`;
  const url = getSiteUrl(canonical);
  const ogImage = imageUrl ? (imageUrl.startsWith("http") ? imageUrl : getSiteUrl(imageUrl)) : getSiteUrl("/opengraph-image");

  return {
    title,
    description,
    keywords: keywords ?? SITE_KEYWORDS,
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: openGraphType,
      url,
      title,
      description,
      siteName: SITE_NAME,
      locale: "zh_CN",
      images: [{ url: ogImage, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "RuleHub — Agent Skills 市场与 AI 编程灵感",
    template: "%s | RuleHub",
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { email: false, address: false, telephone: false },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "RuleHub — Agent Skills 市场与 AI 编程灵感",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "RuleHub — Agent Skills 市场与 AI 编程灵感",
    description: SITE_DESCRIPTION,
  },
  alternates: { canonical: "/" },
};

export const STATIC_SITEMAP_ROUTES: Array<{
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
}> = [
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/search", changeFrequency: "daily", priority: 0.9 },
  { path: "/skills", changeFrequency: "daily", priority: 0.9 },
  { path: "/creators", changeFrequency: "weekly", priority: 0.8 },
  { path: "/occupations", changeFrequency: "weekly", priority: 0.8 },
  { path: "/categories", changeFrequency: "weekly", priority: 0.8 },
  { path: "/vibecoding", changeFrequency: "daily", priority: 0.85 },
  { path: "/vibecoding/news", changeFrequency: "daily", priority: 0.85 },
  { path: "/docs", changeFrequency: "monthly", priority: 0.6 },
  { path: "/about", changeFrequency: "monthly", priority: 0.5 },
  { path: "/privacy", changeFrequency: "monthly", priority: 0.3 },
  { path: "/terms", changeFrequency: "monthly", priority: 0.3 },
];

export const NOINDEX_ROUTES = ["/auth/login", "/login"];
