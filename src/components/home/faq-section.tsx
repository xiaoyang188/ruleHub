"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { FAQ_ITEMS } from "@/data/mock";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionTitleBlock } from "@/components/ui/site-chrome";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section aria-labelledby="faq-heading" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal className="mb-12">
          <SectionTitleBlock
            badge={`${FAQ_ITEMS.length} 个问题`}
            title="常见问题"
            subtitle="关于 Agent Skills 的实用说明：它们是什么、怎么检查来源，以及 RuleHub 如何帮你探索这个生态。"
          />
        </ScrollReveal>

        <div className="space-y-2">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openId === item.id;
            const num = String(index + 1).padStart(2, "0");

            return (
              <ScrollReveal key={item.id} delay={Math.min(index * 50, 300)}>
                <div className="overflow-hidden rounded-xl border border-border bg-card">
                  <button
                    type="button"
                    id={`faq-${item.id}`}
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/30"
                  >
                    <span className="font-medium text-foreground">
                      <span className="mr-3 font-mono text-sm text-primary">{num}</span>
                      {item.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                      {item.answer}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal className="mt-10 text-center" delay={200}>
          <p className="text-sm text-muted-foreground">还有关于 Agent Skills 的问题?</p>
          <Link
            href="/docs"
            className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
          >
            阅读 Agent Skills 文档
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
