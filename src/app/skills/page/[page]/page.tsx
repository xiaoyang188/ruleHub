import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/catalog-sidebar";
import { SkillCard } from "@/components/home/skill-card";
import { ALL_LISTED_SKILLS } from "@/data/detail";
import { notFound } from "next/navigation";

const PAGE_SIZE = 9;

export function generateStaticParams() {
  const totalPages = Math.ceil(ALL_LISTED_SKILLS.length / PAGE_SIZE);
  return Array.from({ length: totalPages }, (_, i) => ({ page: String(i + 1) }));
}

export default async function SkillsPaginatedPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page: pageStr } = await params;
  const page = Number(pageStr);
  const totalPages = Math.ceil(ALL_LISTED_SKILLS.length / PAGE_SIZE);

  if (!Number.isFinite(page) || page < 1 || page > totalPages) notFound();

  const start = (page - 1) * PAGE_SIZE;
  const skills = ALL_LISTED_SKILLS.slice(start, start + PAGE_SIZE);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Breadcrumbs
        items={[
          { label: "Agent Skills 目录", href: "/skills" },
          { label: `第 ${page} 页` },
        ]}
      />

      <header className="mx-auto max-w-3xl border-y border-border py-8 text-center">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">热门 Agent Skills</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          第 {page} / {totalPages} 页
        </p>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center gap-4">
        {page > 1 && (
          <Link
            href={page === 2 ? "/skills" : `/skills/page/${page - 1}`}
            className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/50"
          >
            上一页
          </Link>
        )}
        {page < totalPages && (
          <Link
            href={`/skills/page/${page + 1}`}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-dark"
          >
            下一页
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
