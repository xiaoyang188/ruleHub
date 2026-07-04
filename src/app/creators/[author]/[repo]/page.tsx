import { notFound } from "next/navigation";
import { CreatorRepoView } from "@/components/detail/creator-repo-view";
import { resolveSkillsByRepo } from "@/lib/skill-resolve";
import { getSkillRepoName } from "@/lib/skill-url";
import { ALL_LISTED_SKILLS } from "@/data/detail";

const REPO_ENTRIES = ALL_LISTED_SKILLS.map((skill) => ({
  author: skill.author,
  repo: getSkillRepoName(skill.repo),
}));

export const dynamicParams = true;

export function generateStaticParams() {
  const seen = new Set<string>();
  return REPO_ENTRIES.filter(({ author, repo }) => {
    const key = `${author}/${repo}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).map(({ author, repo }) => ({ author, repo }));
}

export default async function CreatorRepoPage({
  params,
}: {
  params: Promise<{ author: string; repo: string }>;
}) {
  const { author, repo } = await params;
  const skills = await resolveSkillsByRepo(author, repo);
  if (skills.length === 0) notFound();

  return <CreatorRepoView author={author} repo={repo} skills={skills} />;
}
