import Link from "next/link";
import { ArrowRight, Clock, User } from "lucide-react";
import type { InsightArticle } from "@/lib/insights";

export function InsightCard({ article }: { article: InsightArticle }) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_20px_50px_-24px_rgba(217,145,120,0.45)]"
    >
      <div className="border-b border-border/60 bg-gradient-to-r from-primary/[0.08] to-transparent px-4 py-2.5">
        <span className="text-xs font-medium text-primary">{article.category}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h2 className="line-clamp-2 text-base font-semibold leading-snug text-foreground group-hover:text-primary">
          {article.title}
        </h2>
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {article.description}
        </p>
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-border/50 bg-muted/15 px-4 py-2.5 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <User className="h-3.5 w-3.5" />
          {article.author}
        </span>
        <span className="inline-flex items-center gap-2">
          <Clock className="h-3.5 w-3.5" />
          {article.readingMinutes} 分钟
          <ArrowRight className="h-3.5 w-3.5 text-primary/60 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
        </span>
      </div>
    </Link>
  );
}

export function InsightsGrid({ articles }: { articles: InsightArticle[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <InsightCard key={article.slug} article={article} />
      ))}
    </div>
  );
}
