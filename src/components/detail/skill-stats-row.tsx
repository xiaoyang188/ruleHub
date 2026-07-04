import { Calendar, GitFork, Star } from "lucide-react";
import type { SkillDetailMeta } from "@/lib/skill-detail-meta";

export function SkillStatsRow({ meta }: { meta: SkillDetailMeta }) {
  return (
    <section className="mt-3 w-full min-w-0 max-w-[calc(100vw-2rem)] text-xs sm:max-w-full">
      <div className="flex min-w-0 flex-wrap items-center justify-start gap-x-4 gap-y-1.5">
        <div className="flex min-w-0 items-center gap-1.5 whitespace-nowrap">
          <Star className="h-3.5 w-3.5 fill-star text-star" aria-hidden />
          <span className="text-muted-foreground">星标</span>
          <span className="font-semibold text-foreground">{meta.starsDisplay}</span>
        </div>
        <div className="flex min-w-0 items-center gap-1.5 whitespace-nowrap">
          <GitFork className="h-3.5 w-3.5 text-blue-500" aria-hidden />
          <span className="text-muted-foreground">分支</span>
          <span className="font-semibold text-foreground">{meta.forksDisplay}</span>
        </div>
        <div className="flex min-w-0 items-center gap-1.5 whitespace-nowrap">
          <Calendar className="h-3.5 w-3.5 text-green-500" aria-hidden />
          <span className="text-muted-foreground">更新时间</span>
          <span className="font-semibold text-foreground">{meta.updatedAtDisplay}</span>
        </div>
      </div>
    </section>
  );
}
