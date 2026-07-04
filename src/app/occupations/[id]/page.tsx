import { notFound } from "next/navigation";
import { OccupationDetailView } from "@/components/detail/occupation-detail-view";
import { OCCUPATIONS } from "@/data/mock";

export function generateStaticParams() {
  return OCCUPATIONS.map((occupation) => ({ id: occupation.id }));
}

export default async function OccupationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const occupation = OCCUPATIONS.find((item) => item.id === id);
  if (!occupation) notFound();

  return <OccupationDetailView occupation={occupation} />;
}
