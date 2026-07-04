import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
      <Link href="/" className="transition-colors hover:text-foreground">
        首页
      </Link>
      {items.map((item, index) => (
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
  );
}

export function CatalogSidebar() {
  const browseLinks = [
    { href: "#occupations", label: "职业" },
    { href: "/agent-skills", label: "Agent skills" },
    { href: "#categories", label: "按分类找" },
    { href: "#hot-skills", label: "热门 skills" },
    { href: "/search", label: "搜索" },
  ];

  const moreLinks = [
    { href: "/occupations", label: "职业" },
    { href: "/search", label: "搜索" },
    { href: "/agent-skills", label: "Agent Skills 是什么？" },
    { href: "/creators", label: "创作者" },
    { href: "/categories", label: "分类" },
  ];

  return (
    <aside className="hidden shrink-0 lg:block lg:w-56 xl:w-64">
      <nav aria-label="Skills catalog sections" className="sticky top-24 space-y-8">
        <div>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            浏览目录
          </h2>
          <ul className="space-y-1">
            {browseLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            更多入口
          </h2>
          <ul className="space-y-1">
            {moreLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
                >
                  {link.label}
                  <ChevronRight className="h-3.5 w-3.5 opacity-40" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
