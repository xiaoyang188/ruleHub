import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { SimpleMarkdown } from "@/components/ui/simple-markdown";
import type { FaqDocItem, FaqReference } from "@/data/faq-docs";
import { FAQ_DOC_CATEGORIES } from "@/data/faq-docs";
import { cn } from "@/lib/utils";

function FaqReferenceList({ references }: { references: FaqReference[] }) {
  return (
    <div className="mt-6 border-t border-border/80 pt-5">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        参考资料
      </p>
      <ul className="space-y-2.5">
        {references.map((ref) => {
          const external = ref.href.startsWith("http");
          return (
            <li key={`${ref.href}-${ref.title}`}>
              <Link
                href={ref.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-sm transition-colors"
              >
                <span className="font-medium text-primary group-hover:underline">
                  {ref.title}
                </span>
                {(ref.date || ref.type) && (
                  <span className="text-xs text-muted-foreground">
                    {ref.date}
                    {ref.date && ref.type ? " • " : ""}
                    {ref.type}
                  </span>
                )}
                {external && (
                  <ExternalLink className="h-3 w-3 text-muted-foreground/70" aria-hidden />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function FaqDocItemView({ item }: { item: FaqDocItem }) {
  return (
    <article
      id={`q-${item.id}`}
      className="scroll-mt-28 rounded-xl border border-border/80 bg-card/40 p-5 sm:p-6"
    >
      <h3 className="text-base font-semibold leading-snug text-foreground sm:text-lg">
        <span className="mr-1.5 text-primary">Q:</span>
        {item.question}
      </h3>
      <div className="faq-answer mt-4 text-sm leading-relaxed">
        <SimpleMarkdown content={item.answer} />
      </div>
      {item.references && item.references.length > 0 && (
        <FaqReferenceList references={item.references} />
      )}
    </article>
  );
}

export function FaqDocsView() {
  return (
    <div className="space-y-14">
      <nav aria-label="FAQ 分类" className="flex flex-wrap gap-2">
        {FAQ_DOC_CATEGORIES.map((category) => (
          <a
            key={category.id}
            href={`#${category.id}`}
            className="rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            {category.title}
          </a>
        ))}
      </nav>

      {FAQ_DOC_CATEGORIES.map((category) => (
        <section key={category.id} id={category.id} className="scroll-mt-24 space-y-5">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "inline-flex items-center rounded-md border border-primary/30 bg-primary/10",
                "px-2.5 py-1 text-xs font-semibold text-primary"
              )}
            >
              {category.title}
            </span>
            <span className="text-xs text-muted-foreground">
              {category.items.length} 个问题
            </span>
          </div>
          <div className="space-y-4">
            {category.items.map((item) => (
              <FaqDocItemView key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
