import { notFound } from "next/navigation";
import { CategoryDetailView } from "@/components/detail/category-detail-view";
import { getCategoryMeta } from "@/data/detail";
import { CATEGORY_DOMAIN_SECTIONS } from "@/data/categories-page";
import { CATEGORIES } from "@/data/mock";
import { CATEGORY_DOMAINS, SUB_CATEGORIES } from "@/data/catalog";

export function generateStaticParams() {
  const slugs = new Set<string>();
  for (const item of [
    ...CATEGORIES,
    ...CATEGORY_DOMAINS,
    ...SUB_CATEGORIES,
    ...CATEGORY_DOMAIN_SECTIONS,
    ...CATEGORY_DOMAIN_SECTIONS.flatMap((d) => d.subcategories),
  ]) {
    slugs.add(item.id);
  }
  return [...slugs].map((slug) => ({ slug }));
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryMeta(slug);
  if (!category) notFound();

  return (
    <CategoryDetailView slug={slug} name={category.name} count={category.count} />
  );
}
