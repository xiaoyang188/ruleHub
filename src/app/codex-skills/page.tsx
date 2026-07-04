import { PlatformSkillsPage } from "@/components/catalog/platform-skills-page";
import { FEATURED_SKILLS } from "@/data/mock";
import { searchSkills } from "@/lib/skillsmp-api";

const FALLBACK = FEATURED_SKILLS.filter((s) =>
  ["vercel-labs", "browser-use", "Shubhamsaboo", "bytedance"].includes(s.author)
);

export default async function CodexSkillsPage() {
  const result = await searchSkills({ q: "codex", limit: 9, sortBy: "stars" });
  const skills = result.fromApi && result.skills.length > 0 ? result.skills : FALLBACK;

  return (
    <PlatformSkillsPage
      badge="OpenAI Codex"
      title="Codex Skills 目录"
      description="查找适用于软件开发、代码库维护、浏览器工作、文档处理和重复 agent 任务的开源 Codex Skills。"
      breadcrumbLabel="Codex Skills"
      skills={skills}
      ctaHref="/search?q=codex"
      ctaLabel="搜索 Codex Skills"
      docHref="/docs/codex"
    />
  );
}
