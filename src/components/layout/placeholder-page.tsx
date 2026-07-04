import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 md:px-6">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        返回首页
      </Link>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-4 text-muted-foreground">
        {description ?? "此页面将在后续迭代中实现，当前为前端复刻阶段。"}
      </p>
    </div>
  );
}
