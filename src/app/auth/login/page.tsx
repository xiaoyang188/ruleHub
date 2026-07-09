import { redirect } from "next/navigation";
import Link from "next/link";
import { Github } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/catalog-sidebar";
import { IS_PREVIEW_MODE } from "@/lib/site-features";
import { createPageMetadata } from "@/lib/site-seo";

export const metadata = createPageMetadata({
  title: "登录",
  description: "登录 RuleHub",
  path: "/auth/login",
  noIndex: true,
});

export default function LoginPage() {
  if (IS_PREVIEW_MODE) {
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Breadcrumbs items={[{ label: "登录" }]} />

      <div className="mx-auto max-w-md">
        <header className="border-b border-border pb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground">登录 RuleHub</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            使用 GitHub 登录以提升 API 配额、同步收藏与个性化推荐
          </p>
        </header>

        <div className="mt-8 space-y-4 rounded-xl border border-border bg-card p-6">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
          >
            <Github className="h-5 w-5" />
            使用 GitHub 继续
          </button>
          <p className="text-center text-xs text-muted-foreground">
            静态演示 · OAuth 尚未接入
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          登录即表示同意{" "}
          <Link href="/terms" className="text-primary hover:underline">
            服务条款
          </Link>{" "}
          与{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            隐私政策
          </Link>
        </p>
      </div>
    </div>
  );
}
