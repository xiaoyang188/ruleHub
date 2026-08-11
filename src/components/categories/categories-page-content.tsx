"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CATEGORY_DOMAIN_SECTIONS } from "@/data/categories-page";
import { cn } from "@/lib/utils";

function CategoryPill({
  href,
  name,
  count,
}: {
  href: string;
  name: string;
  count: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex max-w-full items-center gap-2 rounded-lg border border-border bg-card/80 px-3 py-2",
        "text-sm transition-colors hover:border-primary/45 hover:bg-muted/30"
      )}
    >
      <span className="font-medium text-foreground">{name}</span>
      <span className="shrink-0 text-xs text-muted-foreground">{count} 个技能</span>
    </Link>
  );
}

export function CategoriesPageContent() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="transition-colors hover:text-foreground">
              首页
            </Link>
          </li>
          <li className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            <span className="text-foreground">分类</span>
          </li>
        </ol>
      </nav>

      <header className="mb-8 lg:mb-10">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">按分类浏览</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
          探索按主要用途分类的 Agent Skills
        </p>
        <p className="mt-2 text-xs text-muted-foreground">注：一个 skill 可能同时属于多个分类</p>
      </header>

      {/* 移动端：横向快速跳转 */}
      <nav
        aria-label="快速跳转到领域"
        className="mb-8 flex gap-2 overflow-x-auto pb-2 lg:hidden"
      >
        {CATEGORY_DOMAIN_SECTIONS.map((domain) => (
          <a
            key={domain.id}
            href={`#${domain.id}`}
            className="shrink-0 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            {domain.name}
          </a>
        ))}
      </nav>

      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
        {/* 桌面端：左侧 sticky 目录 */}
        <aside className="hidden shrink-0 lg:block lg:w-52">
          <nav aria-label="快速跳转到领域" className="sticky top-24">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              快速跳转到领域
            </h2>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              选择一个领域，直接查看其中的分类。
            </p>
            <ul className="mt-4 space-y-1">
              {CATEGORY_DOMAIN_SECTIONS.map((domain) => (
                <li key={domain.id}>
                  <a
                    href={`#${domain.id}`}
                    className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted/40 hover:text-primary"
                  >
                    {domain.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="min-w-0 flex-1 space-y-12">
          {CATEGORY_DOMAIN_SECTIONS.map((domain) => (
            <section key={domain.id} id={domain.id} className="scroll-mt-24">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-border/60 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground">{domain.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{domain.count} 个技能</p>
                </div>
                <Link
                  href={`/categories/${domain.id}`}
                  className="group inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  浏览{domain.name}
                  <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className="flex flex-wrap gap-2">
                {domain.subcategories.map((sub) => (
                  <CategoryPill
                    key={sub.id}
                    href={`/categories/${sub.id}`}
                    name={sub.name}
                    count={sub.count}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
