"use client";

import { useMemo } from "react";
import { SkillCard } from "@/components/home/skill-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { SearchSkill } from "@/lib/skillsmp-api";
import { splitIntoColumns } from "@/lib/split-columns";

const COLUMN_COUNT = 3;

function Column({
  skills,
  query,
}: {
  skills: SearchSkill[];
  query?: string;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4">
      {skills.map((skill) => (
        <ScrollReveal key={skill.id}>
          <SkillCard skill={skill} query={query} showFavorite openInNewTab />
        </ScrollReveal>
      ))}
    </div>
  );
}

export function SearchSkillColumns({
  skills,
  query,
}: {
  skills: SearchSkill[];
  query?: string;
}) {
  const columns = useMemo(
    () => splitIntoColumns(skills, COLUMN_COUNT),
    [skills]
  );

  return (
    <>
      <div className="hidden gap-4 lg:flex">
        {columns.map((col, index) => (
          <Column key={index} skills={col} query={query} />
        ))}
      </div>

      <div className="flex flex-col gap-4 lg:hidden">
        {skills.map((skill) => (
          <ScrollReveal key={skill.id}>
            <SkillCard skill={skill} query={query} showFavorite openInNewTab />
          </ScrollReveal>
        ))}
      </div>
    </>
  );
}
