import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { siteFeatures } from "@/lib/site-features";
import { cn } from "@/lib/utils";

export type DocNavItem = {
  href: string;
  label: string;
  api?: boolean;
};

const DOC_NAV: DocNavItem[] = [
  { href: "/docs", label: "概览" },
  { href: "/docs/api", label: "API 文档", api: true },
  { href: "/docs/skill", label: "Skill 文档" },
  { href: "/docs/faq", label: "FAQ" },
  { href: "/docs/official", label: "官方 Skills" },
  { href: "/docs/codex", label: "Codex Skills" },
  { href: "/docs/spec", label: "规范" },
  { href: "/developers", label: "开发者门户", api: true },
];

const visibleDocNav = DOC_NAV.filter(
  (item) => siteFeatures.showApiDocs || !item.api
);

export function DocsLayout({
  title,
  description,
  breadcrumbs,
  children,
}: {
  title: string;
  description?: string;
  breadcrumbs: { label: string; href?: string }[];
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="transition-colors hover:text-foreground">
          首页
        </Link>
        {breadcrumbs.map((item, index) => (
          <span key={`${item.label}-${index}`} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" />
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
          </span>
        ))}
      </nav>

      <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
        <aside className="shrink-0 lg:w-52">
          <nav aria-label="文档导航" className="sticky top-24 space-y-1">
            {visibleDocNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <article className="min-w-0 flex-1">
          <header className="border-b border-border pb-6">
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{title}</h1>
            {description && (
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{description}</p>
            )}
          </header>
          <div className="prose-docs mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
            {children}
          </div>
        </article>
      </div>
    </div>
  );
}

export function DocCodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 text-xs text-foreground">
      <code>{children}</code>
    </pre>
  );
}

export function DocH2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-semibold text-foreground">{children}</h2>;
}

export function DocLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn("font-medium text-primary hover:text-primary-dark")}
    >
      {children}
    </Link>
  );
}
