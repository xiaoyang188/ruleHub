"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { CATEGORY_DOMAIN_SECTIONS } from "@/data/categories-page";

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

      <header className="mb-10">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">按分类浏览</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
          探索按主要用途分类的 Agent Skills
        </p>
        <p className="mt-2 text-xs text-muted-foreground">注：一个 skill 可能同时属于多个分类</p>
      </header>

      <div className="space-y-12">
        {CATEGORY_DOMAIN_SECTIONS.map((domain) => (
          <section key={domain.id}>
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-foreground">{domain.name}</h2>
                <p className="text-xs text-muted-foreground">{domain.count} 个技能</p>
              </div>
              <Link
                href={`/categories/${domain.id}`}
                className="group flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                <span>查看所有分类</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {domain.subcategories.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/categories/${sub.id}`}
                  className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg active:translate-y-0"
                >
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary">
                      {sub.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">{sub.count} 个技能</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
