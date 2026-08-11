import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FAQ_HOME_ITEMS, getFaqDocCount } from "@/data/faq-docs";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionTitleBlock } from "@/components/ui/site-chrome";

export function FaqSection() {
  return (
    <section aria-labelledby="faq-heading" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal className="mb-12">
          <SectionTitleBlock
            badge={`${getFaqDocCount()} 个问题`}
            title="常见问题"
            subtitle="关于 Agent Skills 的实用说明：它们是什么、怎么检查来源，以及 RuleHub 如何帮你探索这个生态。"
          />
        </ScrollReveal>

        <div className="space-y-2">
          {FAQ_HOME_ITEMS.map((item, index) => {
            const num = String(index + 1).padStart(2, "0");

            return (
              <ScrollReveal key={item.id} delay={Math.min(index * 50, 300)}>
                <Link
                  href={item.href}
                  className="group flex items-start justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4 transition-all hover:border-primary/45 hover:bg-muted/20"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground transition-colors group-hover:text-primary">
                      <span className="mr-3 font-mono text-sm text-primary">{num}</span>
                      {item.question}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {item.answer}
                    </p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal className="mt-10 text-center" delay={200}>
          <p className="text-sm text-muted-foreground">还有关于 Agent Skills 的问题?</p>
          <Link
            href="/docs/faq"
            className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
          >
            查看完整 FAQ
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
