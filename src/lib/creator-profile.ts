import type { SearchSkill } from "@/lib/skillsmp-api";
import { getSkillOccupationTags } from "@/lib/skill-detail-meta";
import { getSkillRepoName } from "@/lib/skill-url";

export interface RepoGroup {
  repoName: string;
  skills: SearchSkill[];
  latestDate: string;
  occupationTitles: string[];
  occupationCount: number;
  sharePercent: number;
}

export function groupSkillsByRepo(skills: SearchSkill[]): RepoGroup[] {
  const map = new Map<string, SearchSkill[]>();

  for (const skill of skills) {
    const repoName = getSkillRepoName(skill.repo);
    const list = map.get(repoName) ?? [];
    list.push(skill);
    map.set(repoName, list);
  }

  const total = skills.length || 1;

  return [...map.entries()]
    .map(([repoName, repoSkills]) => {
      const occupationTitles = [
        ...new Set(
          repoSkills
            .map((s) => getSkillOccupationTags(s).title)
            .filter((title) => title !== "未分类")
        ),
      ];
      const hasUnclassifiedOnly =
        occupationTitles.length === 0 &&
        repoSkills.some((s) => getSkillOccupationTags(s).title === "未分类");
      const dates = repoSkills.map((s) => s.updatedAt).sort().reverse();

      return {
        repoName,
        skills: repoSkills,
        latestDate: dates[0] ?? "",
        occupationTitles: hasUnclassifiedOnly ? [] : occupationTitles,
        occupationCount: hasUnclassifiedOnly ? 0 : occupationTitles.length,
        sharePercent: Math.round((repoSkills.length / total) * 1000) / 10,
      };
    })
    .sort((a, b) => b.skills.length - a.skills.length);
}

export function getCreatorLatestDate(skills: SearchSkill[]) {
  return [...skills].map((s) => s.updatedAt).sort().reverse()[0] ?? "";
}

export function formatRepoRank(index: number, width: 2 | 3 = 2) {
  return `#${String(index + 1).padStart(width, "0")}`;
}
