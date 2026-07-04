import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { OCCUPATIONS, STATS } from "@/data/mock";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { PrimaryCtaLink, SectionTitleBlock } from "@/components/ui/site-chrome";
import { getGridStaggerDelay } from "@/lib/animation";

const MAX_OCCUPATION_COUNT = 1_265_857;

function getBarWidth(count: string) {
  const value = Number(count.replace(/,/g, ""));
  return Math.max(8, Math.round((value / MAX_OCCUPATION_COUNT) * 100));
}

export function OccupationsSection() {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-8">
          <SectionTitleBlock
            badge={`${STATS.classifiedPercent}% classified`}
            title="按职业浏览 Agent Skills"
            subtitle={`${STATS.occupationGroups}个主要职业组 · ${STATS.socPositions}个SOC职位`}
          />
        </ScrollReveal>

        <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {OCCUPATIONS.map((occupation, index) => (
            <ScrollReveal key={occupation.id} delay={getGridStaggerDelay(index, 4)}>
              <Link
                href={`/occupations/${occupation.id}`}
                className="group relative flex h-[152px] flex-col gap-3 overflow-hidden rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 active:translate-y-0"
              >
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-semibold tracking-wider text-muted-foreground">
                    #{occupation.rank}
                  </span>
                  <ArrowRight className="h-3 w-3 -translate-x-1 text-muted-foreground/20 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:text-primary group-hover:opacity-100" />
                </div>

                <h3 className="relative z-10 flex-1 text-sm font-semibold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary">
                  {occupation.name}
                </h3>

                <div className="relative z-10 space-y-1.5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {occupation.count}
                    </span>
                    <span className="text-[10px] text-muted-foreground">个技能</span>
                  </div>
                  <div className="h-px overflow-hidden rounded-full bg-border">
                    <div
                      className="h-full rounded-full bg-primary/35 transition-all duration-500 group-hover:bg-primary/60"
                      style={{ width: `${getBarWidth(occupation.count)}%` }}
                    />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center" delay={400}>
          <PrimaryCtaLink href="/occupations">探索各职业技能</PrimaryCtaLink>
        </ScrollReveal>
      </div>
    </section>
  );
}
