import { PlatformSkillsPage } from "@/components/catalog/platform-skills-page";
import { FEATURED_SKILLS } from "@/data/mock";
import { searchSkills } from "@/lib/skillsmp-api";

const FALLBACK = FEATURED_SKILLS.filter((s) =>
  ["anthropics", "obra", "nextlevelbuilder"].includes(s.author)
);

export default async function ClaudeSkillsPage() {
  const result = await searchSkills({ q: "claude", limit: 9, sortBy: "stars" });
  const skills = result.fromApi && result.skills.length > 0 ? result.skills : FALLBACK;

  return (
    <PlatformSkillsPage
      badge="Claude Code"
      title="Claude Skills 目录"
      description="查找围绕 SKILL.md 组织的开源 Claude Skills，用于 Claude Code、Claude 工作流和可复用任务能力。"
      breadcrumbLabel="Claude Skills"
      skills={skills}
      ctaHref="/search?q=claude"
      ctaLabel="搜索 Claude Skills"
      docHref="/docs/skill"
    />
  );
}
