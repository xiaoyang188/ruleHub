import type { Skill } from "@/data/mock";

/** SkillsMP canonical path: /creators/{author}/{repoName}/{slug} */
export function getSkillRepoName(repo: string) {
  return repo.includes("/") ? repo.split("/").slice(1).join("/") : repo;
}

export function getSkillSlug(skill: Skill) {
  return `skills-${skill.name}`;
}

export function getSkillDetailPath(skill: Skill) {
  const repoName = getSkillRepoName(skill.repo);
  return `/creators/${skill.author}/${repoName}/${getSkillSlug(skill)}`;
}

export function getSkillBySlugParts(
  skills: Skill[],
  author: string,
  repo: string,
  slug: string
) {
  return skills.find((skill) => {
    const repoName = getSkillRepoName(skill.repo);
    if (skill.author !== author || repoName !== repo) return false;
    return (
      getSkillSlug(skill) === slug ||
      skill.name === slug ||
      slug.endsWith(skill.name) ||
      slug === `skills-${skill.name}`
    );
  });
}
