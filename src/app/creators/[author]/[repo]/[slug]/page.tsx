import { notFound } from "next/navigation";
import { SkillDetailView } from "@/components/detail/skill-detail-view";
import { ALL_LISTED_SKILLS } from "@/data/detail";
import { resolveSkillDetail } from "@/lib/skill-resolve";
import { getSkillRepoName, getSkillSlug } from "@/lib/skill-url";

export const dynamicParams = true;

export function generateStaticParams() {
  return ALL_LISTED_SKILLS.map((skill) => ({
    author: skill.author,
    repo: getSkillRepoName(skill.repo),
    slug: getSkillSlug(skill),
  }));
}

export default async function CreatorSkillDetailPage({
  params,
}: {
  params: Promise<{ author: string; repo: string; slug: string }>;
}) {
  const { author, repo, slug } = await params;
  const resolved = await resolveSkillDetail(author, repo, slug);
  if (!resolved) notFound();

  return (
    <SkillDetailView
      skill={resolved}
      detailPath={resolved.detailHref}
      githubTreeUrl={resolved.githubTreeUrl}
      fromApi={resolved.fromApi}
    />
  );
}
