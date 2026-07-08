import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  MessageCircle,
  Newspaper,
  Star,
} from "lucide-react";
import type { VibecodingItem } from "@/lib/vibecoding-utils";
import {
  displaySummary,
  displayTitle,
  extractDomain,
  formatRelativeTime,
  getHnDiscussionUrl,
  getPreviewCandidates,
  sourceLabel,
} from "@/lib/vibecoding-utils";

function ArticleAvatar({ item }: { item: VibecodingItem }) {
  const src = getPreviewCandidates(item)[0];
  const initial = (item.author || displayTitle(item) || "?").charAt(0).toUpperCase();

  if (!src) {
    return (
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-muted/40 text-sm font-semibold text-foreground">
        {initial}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt=""
      width={40}
      height={40}
      className="h-10 w-10 shrink-0 rounded-full border border-primary/30 object-cover"
    />
  );
}

export function VibecodingNewsArticle({ item }: { item: VibecodingItem }) {
  const title = displayTitle(item);
  const summary = displaySummary(item);
  const domain = extractDomain(item.url);
  const hnUrl = getHnDiscussionUrl(item);
  const publishedLabel = item.publishedAt ? formatRelativeTime(item.publishedAt) : null;

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <nav aria-label="面包屑" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link href="/vibecoding/news" className="inline-flex items-center gap-1 transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          AI 最新消息
        </Link>
      </nav>

      <header className="border-b border-border pb-8">
        <p className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-primary">
          <Newspaper className="h-4 w-4" />
          {sourceLabel(item.source)}
        </p>
        <h1 className="text-2xl font-bold leading-snug text-foreground sm:text-3xl">{title}</h1>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <ArticleAvatar item={item} />
            <span>
              {item.author ? `@${item.author}` : "匿名"}
              {domain ? ` · ${domain}` : null}
            </span>
          </span>
          {publishedLabel ? <time>{publishedLabel}</time> : null}
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-star text-star" />
            {item.score}
          </span>
          {item.commentCount > 0 ? (
            <span className="inline-flex items-center gap-1">
              <MessageCircle className="h-3.5 w-3.5" />
              {item.commentCount} 评论
            </span>
          ) : null}
        </div>
      </header>

      <div className="py-8">
        {summary ? (
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            {summary.split(/\n+/).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">暂无摘要，请点击下方链接查看原文。</p>
        )}
      </div>

      <footer className="flex flex-wrap gap-3 border-t border-border pt-8">
        {item.url ? (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-primary bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
          >
            阅读原文
            <ExternalLink className="h-4 w-4" />
          </a>
        ) : null}
        {hnUrl ? (
          <a
            href={hnUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50"
          >
            Hacker News 讨论
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </a>
        ) : null}
      </footer>
    </article>
  );
}
