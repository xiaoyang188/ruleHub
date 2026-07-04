import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function StaticPageShell({
  title,
  description,
  breadcrumbs = [],
  badge,
  children,
  className,
}: {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  badge?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14", className)}>
      {breadcrumbs.length > 0 && (
        <nav aria-label="面包屑" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
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
      )}

      <div className="mx-auto max-w-3xl border-y border-border py-8 text-center">
        {badge && (
          <p className="mb-2 text-sm font-medium text-primary">{badge}</p>
        )}
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{title}</h1>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">{description}</p>
        )}
      </div>

      {children && <div className="mt-10">{children}</div>}
    </div>
  );
}
