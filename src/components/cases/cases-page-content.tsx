import { LayoutGrid } from "lucide-react";
import { CasesGrid } from "@/components/cases/cases-grid";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { CASES } from "@/data/cases";

export function CasesPageContent() {
  const featuredCount = CASES.filter((item) => item.featured).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <ScrollReveal>
        <header className="mx-auto mb-8 max-w-3xl border-y border-border py-8 text-center">
          <p className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-primary">
            <LayoutGrid className="h-4 w-4" />
            Case Showcase
          </p>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">案例展示</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            精选多端与业务落地案例。同类商城也会按差异需求拆开写：人脸 / IM、工业对公、跨境双节点、经销批发、票务核销等，避免「又一个商城」叙事。
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            共 {CASES.length} 个项目 · 其中精品 {featuredCount} 个
          </p>
        </header>
      </ScrollReveal>

      <CasesGrid items={CASES} />
    </div>
  );
}
