import { notFound } from "next/navigation";
import { StaticPageShell } from "@/components/layout/static-page-shell";

export function makeStaticPage({
  title,
  description,
  breadcrumbs,
  badge,
}: {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  badge?: string;
}) {
  return function Page() {
    return (
      <StaticPageShell
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
        badge={badge}
      >
        <p className="mx-auto max-w-2xl text-center text-sm text-muted-foreground">
          静态复刻页面 · 视觉与交互将在下一阶段与原站 1:1 对齐
        </p>
      </StaticPageShell>
    );
  };
}

export function makeDetailPage<T>({
  items,
  getKey,
  getTitle,
  getDescription,
  breadcrumbs,
  parentHref,
  parentLabel,
}: {
  items: T[];
  getKey: (item: T) => string;
  getTitle: (item: T) => string;
  getDescription?: (item: T) => string;
  breadcrumbs: (item: T) => { label: string; href?: string }[];
  parentHref: string;
  parentLabel: string;
}) {
  return function Page({ params }: { params: Promise<{ id: string }> }) {
    return <DetailPageInner params={params} />;
  };

  async function DetailPageInner({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = items.find((entry) => getKey(entry) === id);
    if (!item) notFound();

    return (
      <StaticPageShell
        title={getTitle(item)}
        description={getDescription?.(item)}
        breadcrumbs={[
          { label: parentLabel, href: parentHref },
          ...breadcrumbs(item),
        ]}
      >
        <p className="mx-auto max-w-2xl text-center text-sm text-muted-foreground">
          详情页静态占位 · 后续接入 mock / API 数据并复刻原站布局
        </p>
      </StaticPageShell>
    );
  }
}
