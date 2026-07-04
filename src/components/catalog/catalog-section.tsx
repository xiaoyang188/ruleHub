import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CatalogLinkCard } from "@/data/catalog";

export function CatalogLinkCard({ card }: { card: CatalogLinkCard }) {
  return (
    <Link
      href={card.href}
      className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
    >
      <h3 className="mb-2 text-sm font-semibold text-foreground group-hover:text-primary">
        {card.title}
      </h3>
      <p className="mb-4 flex-1 text-xs leading-relaxed text-muted-foreground">
        {card.description}
      </p>
      <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
        {card.cta ?? "浏览"}
        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export function CatalogSectionHeading({
  id,
  title,
  subtitle,
  action,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div id={id} className="scroll-mt-28 border-b border-border pb-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">{title}</h2>
          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {action && (
          <Link
            href={action.href}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-dark"
          >
            {action.label}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
