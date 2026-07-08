"use client";

import { Newspaper } from "lucide-react";
import { VibecodingFeed } from "@/components/vibecoding/vibecoding-feed";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function VibecodingNewsPageContent() {
  return (
    <VibecodingFeed
      type="news"
      defaultSort="recent"
      countLabel={(total) => `共 ${total} 条消息`}
      emptyTitle="暂无 AI 消息"
      emptyHint="后端需同步 Hacker News 首页 AI 相关帖子（type=news）。请在 zuqiu-api 完成新闻同步后重新执行 sync。"
      header={
        <ScrollReveal>
          <header className="mx-auto mb-8 max-w-3xl border-y border-border py-8 text-center">
            <p className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-primary">
              <Newspaper className="h-4 w-4" />
              AI 最新消息
            </p>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              追踪 AI 行业动态与热点讨论
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
              聚合 Hacker News 首页 AI、LLM、Agent 相关新闻与讨论，默认按最新排序。
            </p>
          </header>
        </ScrollReveal>
      }
    />
  );
}
