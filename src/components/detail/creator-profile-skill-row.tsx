import Link from "next/link";
import { CreatorOccupationChip } from "@/components/detail/creator-occupation-chip";
import type { SearchSkill } from "@/lib/skillsmp-api";
import { getSkillOccupationTagTitles } from "@/lib/skill-detail-meta";
import { getSkillDetailPath } from "@/lib/skill-url";

export function CreatorProfileSkillRow({ skill }: { skill: SearchSkill }) {
  const href = skill.detailHref ?? getSkillDetailPath(skill);
  const occupationTitles = getSkillOccupationTagTitles(skill);

  return (
    <Link
      href={href}
      className="group grid gap-3 px-4 py-3 transition-colors hover:bg-muted/30 md:grid-cols-[minmax(170px,0.55fr)_minmax(170px,0.45fr)_minmax(0,1.35fr)_90px] md:items-start md:gap-4"
    >
      <div className="min-w-0">
        <div className="truncate font-mono text-sm font-medium leading-5 text-foreground group-hover:text-primary">
          {skill.name}
        </div>
      </div>

      <div className="flex min-w-0 flex-wrap gap-1.5">
        {occupationTitles.map((title) => (
          <CreatorOccupationChip key={title} title={title} muted />
        ))}
      </div>

      <p className="min-w-0 text-sm leading-6 text-muted-foreground">{skill.description}</p>

      <div className="font-mono text-[11px] leading-[16.5px] text-muted-foreground">
        {skill.updatedAt}
      </div>
    </Link>
  );
}
