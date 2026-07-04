import { notFound, redirect } from "next/navigation";
import { FEATURED_SKILLS } from "@/data/mock";
import { getSkillDetailPath } from "@/lib/skill-url";

export function generateStaticParams() {
  return FEATURED_SKILLS.map((skill) => ({ id: skill.id }));
}

export default async function SkillDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const skill = FEATURED_SKILLS.find((item) => item.id === id);
  if (!skill) notFound();

  redirect(getSkillDetailPath(skill));
}
