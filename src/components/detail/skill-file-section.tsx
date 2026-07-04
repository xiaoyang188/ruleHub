"use client";

import { useState } from "react";
import { SkillFileTree, type SkillFileId } from "@/components/detail/skill-file-tree";
import { SkillMdPreview } from "@/components/detail/skill-md-preview";
import { SkillSameRepoSection } from "@/components/detail/skill-same-repo-section";
import type { Skill } from "@/data/mock";

export function SkillFileSection({
  skillMd,
  sameRepoSkills,
  licenseText = "Apache License 2.0\n\nCopyright (c) Contributors",
}: {
  skillMd: string;
  sameRepoSkills: Skill[];
  licenseText?: string;
}) {
  const [active, setActive] = useState<SkillFileId>("skill");
  const fileName = active === "skill" ? "SKILL.md" : "LICENSE.txt";
  const content = active === "skill" ? skillMd : licenseText;

  return (
    <>
      <SkillFileTree active={active} onSelect={setActive} />
      <SkillMdPreview fileName={fileName} content={content} />
      <SkillSameRepoSection skills={sameRepoSkills} />
    </>
  );
}
