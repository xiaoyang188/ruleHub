import Link from "next/link";
import { ArrowRight, Folder } from "lucide-react";
import { CATEGORIES } from "@/data/mock";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { PrimaryCtaLink, SectionTitleBlock } from "@/components/ui/site-chrome";
import { getRowStaggerDelay } from "@/lib/animation";
import { cn } from "@/lib/utils";

const CATEGORY_STYLES: Record<
  string,
  {
    card: string;
    icon: string;
    title: string;
    count: string;
    arrow: string;
  }
> = {
  tools: {
    card: "hover:border-cyan-500 hover:shadow-cyan-500/10 dark:hover:border-cyan-400 dark:hover:shadow-cyan-400/10",
    icon: "text-cyan-600 opacity-[0.06] group-hover:opacity-[0.12] dark:text-cyan-400",
    title: "group-hover:text-cyan-500 dark:group-hover:text-cyan-400",
    count: "text-cyan-500 dark:text-cyan-400",
    arrow: "group-hover:text-cyan-500 dark:group-hover:text-cyan-400",
  },
  business: {
    card: "hover:border-amber-500 hover:shadow-amber-500/10 dark:hover:border-amber-400 dark:hover:shadow-amber-400/10",
    icon: "text-amber-600 opacity-[0.06] group-hover:opacity-[0.12] dark:text-amber-400",
    title: "group-hover:text-amber-500 dark:group-hover:text-amber-400",
    count: "text-amber-500 dark:text-amber-400",
    arrow: "group-hover:text-amber-500 dark:group-hover:text-amber-400",
  },
  development: {
    card: "hover:border-blue-500 hover:shadow-blue-500/10 dark:hover:border-blue-400 dark:hover:shadow-blue-400/10",
    icon: "text-blue-600 opacity-[0.06] group-hover:opacity-[0.12] dark:text-blue-400",
    title: "group-hover:text-blue-500 dark:group-hover:text-blue-400",
    count: "text-blue-500 dark:text-blue-400",
    arrow: "group-hover:text-blue-500 dark:group-hover:text-blue-400",
  },
  "testing-security": {
    card: "hover:border-emerald-500 hover:shadow-emerald-500/10 dark:hover:border-emerald-400 dark:hover:shadow-emerald-400/10",
    icon: "text-emerald-600 opacity-[0.06] group-hover:opacity-[0.12] dark:text-emerald-400",
    title: "group-hover:text-emerald-500 dark:group-hover:text-emerald-400",
    count: "text-emerald-500 dark:text-emerald-400",
    arrow: "group-hover:text-emerald-500 dark:group-hover:text-emerald-400",
  },
  "data-ai": {
    card: "hover:border-violet-500 hover:shadow-violet-500/10 dark:hover:border-violet-400 dark:hover:shadow-violet-400/10",
    icon: "text-violet-600 opacity-[0.06] group-hover:opacity-[0.12] dark:text-violet-400",
    title: "group-hover:text-violet-500 dark:group-hover:text-violet-400",
    count: "text-violet-500 dark:text-violet-400",
    arrow: "group-hover:text-violet-500 dark:group-hover:text-violet-400",
  },
  devops: {
    card: "hover:border-orange-500 hover:shadow-orange-500/10 dark:hover:border-orange-400 dark:hover:shadow-orange-400/10",
    icon: "text-orange-600 opacity-[0.06] group-hover:opacity-[0.12] dark:text-orange-400",
    title: "group-hover:text-orange-500 dark:group-hover:text-orange-400",
    count: "text-orange-500 dark:text-orange-400",
    arrow: "group-hover:text-orange-500 dark:group-hover:text-orange-400",
  },
  documentation: {
    card: "hover:border-sky-500 hover:shadow-sky-500/10 dark:hover:border-sky-400 dark:hover:shadow-sky-400/10",
    icon: "text-sky-600 opacity-[0.06] group-hover:opacity-[0.12] dark:text-sky-400",
    title: "group-hover:text-sky-500 dark:group-hover:text-sky-400",
    count: "text-sky-500 dark:text-sky-400",
    arrow: "group-hover:text-sky-500 dark:group-hover:text-sky-400",
  },
  "content-media": {
    card: "hover:border-rose-500 hover:shadow-rose-500/10 dark:hover:border-rose-400 dark:hover:shadow-rose-400/10",
    icon: "text-rose-600 opacity-[0.06] group-hover:opacity-[0.12] dark:text-rose-400",
    title: "group-hover:text-rose-500 dark:group-hover:text-rose-400",
    count: "text-rose-500 dark:text-rose-400",
    arrow: "group-hover:text-rose-500 dark:group-hover:text-rose-400",
  },
};

export function CategoriesSection() {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-8">
          <SectionTitleBlock
            badge="2.1M+"
            title="按分类浏览"
            subtitle="探索按主要用途分类的 Agent Skills"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category, index) => {
            const styles = CATEGORY_STYLES[category.id];

            return (
              <ScrollReveal key={category.id} delay={getRowStaggerDelay(index, 4)}>
                <Link
                  href={`/categories/${category.id}`}
                  className={cn(
                    "group relative flex h-[90px] flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:translate-y-0",
                    styles.card
                  )}
                >
                  <div
                    className={cn(
                      "absolute -bottom-2 -right-2 transition-opacity",
                      styles.icon
                    )}
                  >
                    <Folder className="h-14 w-14" aria-hidden />
                  </div>

                  <h3
                    className={cn(
                      "relative z-10 text-sm font-semibold leading-snug text-foreground transition-colors",
                      styles.title
                    )}
                  >
                    {category.name}
                  </h3>

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      <span className={cn("font-medium", styles.count)}>
                        {category.count}
                      </span>{" "}
                      个技能
                    </span>
                    <ArrowRight
                      className={cn(
                        "h-3.5 w-3.5 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100",
                        styles.arrow
                      )}
                    />
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal className="mt-10 text-center" delay={400}>
          <PrimaryCtaLink href="/categories">查看所有分类</PrimaryCtaLink>
        </ScrollReveal>
      </div>
    </section>
  );
}
