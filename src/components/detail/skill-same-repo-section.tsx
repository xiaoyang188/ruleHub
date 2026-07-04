import Link from "next/link";
import type { Skill } from "@/data/mock";
import { getSkillDetailPath } from "@/lib/skill-url";

export function SkillSameRepoSection({ skills }: { skills: Skill[] }) {
  if (skills.length === 0) return null;

  return (
    <section
      aria-labelledby="related-skills-heading"
      className="mt-8 overflow-hidden rounded-lg border border-border bg-card"
    >
      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="truncate text-xs font-medium text-muted-foreground">
            同仓库更多 Skills
          </span>
        </div>
        <span className="shrink-0 text-xs text-muted-foreground">同仓库</span>
      </div>
      <div className="p-4 sm:p-5">
        <h2 id="related-skills-heading" className="text-2xl font-semibold tracking-normal text-foreground">
          同仓库更多 Skills
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {skills.map((item) => (
            <Link
              key={item.id}
              href={getSkillDetailPath(item)}
              className="group flex min-h-36 flex-col rounded-md border border-border bg-background/60 p-4 transition-colors hover:border-primary/60 hover:bg-muted/30"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground group-hover:text-primary">
                    {item.name}
                  </p>
                  <p className="mt-1 truncate text-xs text-muted-foreground">{item.repo}</p>
                </div>
              </div>
              <p className="mt-3 line-clamp-3 flex-1 text-xs leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
