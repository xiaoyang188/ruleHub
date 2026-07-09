import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import { SimpleMarkdown } from "@/components/ui/simple-markdown";
import type { InsightArticle } from "@/lib/insights";

export function InsightArticleView({ article }: { article: InsightArticle }) {
  const dateLabel = article.publishedAt.slice(0, 10);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <nav className="mb-8">
        <Link
          href="/insights"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          返回洞察专栏
        </Link>
      </nav>

      <header className="border-b border-border pb-8">
        <p className="mb-3 text-sm font-medium text-primary">{article.category}</p>
        <h1 className="text-2xl font-bold leading-snug text-foreground sm:text-3xl">{article.title}</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{article.description}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <User className="h-4 w-4" />
            {article.author}
          </span>
          <time dateTime={article.publishedAt}>{dateLabel}</time>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            约 {article.readingMinutes} 分钟阅读
          </span>
        </div>
        {article.tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border bg-muted/20 px-2 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </header>

      <div className="py-8">
        <SimpleMarkdown content={article.content} />
      </div>

      <footer className="border-t border-border pt-8 text-sm text-muted-foreground">
        <p>
          本文由 {article.author} 撰写并发布于 RuleHub 洞察专栏。转载请注明出处并链接至原文。
        </p>
        <p className="mt-3">
          有建议或纠错？请访问{" "}
          <Link href="/contact" className="text-primary hover:underline">
            联系我们
          </Link>
          。
        </p>
      </footer>
    </article>
  );
}
