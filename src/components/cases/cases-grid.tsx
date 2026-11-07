import { CaseCard } from "@/components/cases/case-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { CaseItem } from "@/data/cases";

export function CasesGrid({ items }: { items: CaseItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <ScrollReveal key={item.id}>
          <CaseCard item={item} />
        </ScrollReveal>
      ))}
    </div>
  );
}
