import { notFound } from "next/navigation";
import { CreatorProfileView } from "@/components/detail/creator-profile-view";
import { ALL_LISTED_SKILLS } from "@/data/detail";
import { CREATOR_DIRECTORY } from "@/data/creators-directory";
import { resolveSkillsByAuthor } from "@/lib/skill-resolve";

const PROFILE_AUTHORS = [
  ...new Set([
    ...ALL_LISTED_SKILLS.map((skill) => skill.author),
    ...CREATOR_DIRECTORY.map((creator) => creator.author),
  ]),
];

export const dynamicParams = true;
export const dynamic = "force-dynamic";
export const revalidate = 3600;

export function generateStaticParams() {
  return PROFILE_AUTHORS.map((author) => ({ author }));
}

export default async function CreatorProfilePage({
  params,
}: {
  params: Promise<{ author: string }>;
}) {
  const { author } = await params;
  const skills = await resolveSkillsByAuthor(author);
  if (skills.length === 0) notFound();

  return <CreatorProfileView author={author} skills={skills} />;
}
