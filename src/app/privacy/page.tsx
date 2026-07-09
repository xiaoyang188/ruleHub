import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/catalog-sidebar";
import {
  LEGAL_LAST_UPDATED,
  SITE_CONTACT_EMAIL,
  SITE_OPERATOR,
} from "@/lib/site-contact";
import { createPageMetadata, SITE_NAME, SITE_URL } from "@/lib/site-seo";

export const metadata = createPageMetadata({
  title: "隐私政策",
  description: "RuleHub 隐私政策：说明我们收集的数据、Cookie、第三方广告（含 Google AdSense）及您的权利。",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Breadcrumbs items={[{ label: "隐私政策" }]} />

      <article className="mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-muted-foreground">
        <header className="border-b border-border pb-6">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">隐私政策</h1>
          <p className="mt-3">最后更新：{LEGAL_LAST_UPDATED}</p>
          <p className="mt-4">
            本政策说明 {SITE_NAME}（{SITE_URL}，以下简称「本网站」）如何收集、使用、存储与保护您的个人信息。使用本网站即表示您同意本政策。
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">1. 运营主体</h2>
          <p>
            本网站由 {SITE_OPERATOR} 运营。如有隐私相关问题，请通过{" "}
            <Link href="/contact" className="text-primary hover:underline">
              联系我们
            </Link>{" "}
            页面或邮件{" "}
            <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="text-primary hover:underline">
              {SITE_CONTACT_EMAIL}
            </a>{" "}
            与我们联系。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">2. 我们收集的信息</h2>
          <p>根据您使用本网站的方式，我们可能收集以下类型的信息：</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">自动收集的技术信息：</strong>
              IP 地址、浏览器类型、操作系统、访问时间、引荐 URL、页面浏览记录及设备信息（通过服务器日志与分析工具）。
            </li>
            <li>
              <strong className="text-foreground">Cookie 与类似技术：</strong>
              用于维持会话、记住偏好、统计访问量及展示广告（详见下文 Cookie 政策）。
            </li>
            <li>
              <strong className="text-foreground">账户信息（若启用登录）：</strong>
              若您使用 GitHub 等第三方 OAuth 登录，我们仅获取该服务公开的 profile 信息（如用户名、头像），不收集您的密码。
            </li>
            <li>
              <strong className="text-foreground">您主动提供的信息：</strong>
              通过邮件或联系表单发送的咨询内容。
            </li>
          </ul>
          <p>我们不会故意收集 13 岁以下儿童的个人信息。</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">3. 信息使用目的</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>提供、维护与改进网站功能（搜索、浏览、资讯阅读等）</li>
            <li>分析访问趋势，优化用户体验与内容结构</li>
            <li>展示个性化或上下文相关的广告（含 Google AdSense）</li>
            <li>响应您的咨询、投诉与法律请求</li>
            <li>防止欺诈、滥用与未经授权的访问</li>
            <li>遵守适用的法律法规</li>
          </ul>
          <p>我们不会出售您的个人数据。</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">4. Cookie 政策</h2>
          <p>
            Cookie 是存储在您设备上的小型文本文件。本网站及第三方服务可能使用 Cookie 及类似技术（如像素、localStorage）。
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">必要 Cookie：</strong>
              保障网站基本功能与安全。
            </li>
            <li>
              <strong className="text-foreground">分析 Cookie：</strong>
              帮助我们了解访问者如何使用网站（如页面热度、流量来源）。
            </li>
            <li>
              <strong className="text-foreground">广告 Cookie：</strong>
              由 Google 等广告合作伙伴设置，用于展示相关广告、限制重复展示及衡量广告效果。
            </li>
          </ul>
          <p>
            您可通过浏览器设置拒绝或删除 Cookie。禁用 Cookie 可能导致部分功能无法正常使用。关于 Google 广告 Cookie 的更多信息，请访问{" "}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Google 广告技术说明
            </a>
            。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">5. Google AdSense 与第三方广告</h2>
          <p>
            本网站可能使用 <strong className="text-foreground">Google AdSense</strong> 或其他第三方广告服务展示广告。这些第三方（包括
            Google）可能使用 Cookie、设备标识符或类似技术，根据您对本网站及互联网上其他网站的访问记录，向您展示个性化广告。
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Google 作为第三方供应商，使用 Cookie 在本网站及互联网其他站点上投放广告。
            </li>
            <li>
              Google 对 DART Cookie 的使用使 Google 及其合作伙伴能够向用户投放广告。您可访问{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google 广告政策
              </a>{" "}
              了解详情，并在{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google 广告设置
              </a>{" "}
              中管理个性化广告偏好。
            </li>
            <li>
              您也可访问{" "}
              <a
                href="https://optout.aboutads.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                aboutads.info
              </a>{" "}
              选择退出部分第三方供应商的个性化广告。
            </li>
          </ul>
          <p>
            广告内容由第三方广告商提供，不代表 {SITE_NAME} 的观点。点击广告后您将离开本网站，受该广告商隐私政策约束。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">6. 第三方服务</h2>
          <p>本网站可能集成或链接以下第三方服务，其数据处理受各自隐私政策约束：</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>GitHub（开源仓库索引与 OAuth 登录）</li>
            <li>Google（Analytics、AdSense、字体等）</li>
            <li>Hacker News 及外部新闻原文链接</li>
            <li>内容分发与 API 合作伙伴</li>
          </ul>
          <p>我们不对第三方网站的隐私做法负责，建议您查阅其隐私政策。</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">7. 数据保留与安全</h2>
          <p>
            我们仅在实现本政策所述目的所需的期限内保留信息，或按法律要求保留。我们采取合理的技术与管理措施保护数据，但互联网传输无法保证绝对安全。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">8. 您的权利</h2>
          <p>根据适用法律，您可能享有以下权利（以当地法规为准）：</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>访问我们持有的与您相关的个人信息</li>
            <li>要求更正不准确的信息</li>
            <li>要求删除特定信息（在法律允许范围内）</li>
            <li>限制或反对特定处理活动</li>
            <li>撤回此前给予的同意</li>
          </ul>
          <p>
            如需行使上述权利，请邮件联系{" "}
            <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="text-primary hover:underline">
              {SITE_CONTACT_EMAIL}
            </a>
            。我们将在合理期限内回复。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">9. 国际访问</h2>
          <p>
            本网站面向全球用户提供服务。您的信息可能被传输至您所在国家/地区以外进行处理。使用本网站即表示您同意此类传输。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">10. 政策更新</h2>
          <p>
            我们可能不时更新本政策。更新后的版本将发布于本页面并更新「最后更新」日期。重大变更时，我们可能在网站显著位置提示。继续使用本网站即视为接受更新后的政策。
          </p>
        </section>

        <section className="space-y-3 border-t border-border pt-6">
          <h2 className="text-lg font-semibold text-foreground">11. 联系我们</h2>
          <p>
            隐私相关问题请联系：{" "}
            <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="text-primary hover:underline">
              {SITE_CONTACT_EMAIL}
            </a>
            ，或访问{" "}
            <Link href="/contact" className="text-primary hover:underline">
              联系我们
            </Link>
            页面。
          </p>
        </section>
      </article>
    </div>
  );
}
