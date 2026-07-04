import { Breadcrumbs } from "@/components/layout/catalog-sidebar";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Breadcrumbs items={[{ label: "隐私政策" }]} />

      <article className="mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-muted-foreground">
        <header className="border-b border-border pb-6">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">隐私政策</h1>
          <p className="mt-3">最后更新：2026-07-01</p>
        </header>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">我们收集什么</h2>
          <p>
            RuleHub 为静态演示项目。若启用 GitHub 登录，我们将仅获取公开 profile 信息与 OAuth
            令牌用于身份识别，不收集密码。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">数据用途</h2>
          <p>用于提供搜索配额、收藏同步与个性化推荐。我们不会出售个人数据。</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">第三方服务</h2>
          <p>
            搜索索引数据来自 GitHub 公开仓库。使用 GitHub OAuth 时受 GitHub 隐私政策约束。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">联系我们</h2>
          <p>如有隐私相关问题，请通过 GitHub Issues 联系项目维护者。</p>
        </section>
      </article>
    </div>
  );
}
