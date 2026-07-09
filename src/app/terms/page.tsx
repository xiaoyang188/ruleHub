import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/catalog-sidebar";
import {
  LEGAL_LAST_UPDATED,
  SITE_CONTACT_EMAIL,
  SITE_OPERATOR,
} from "@/lib/site-contact";
import { createPageMetadata, SITE_NAME, SITE_URL } from "@/lib/site-seo";

export const metadata = createPageMetadata({
  title: "服务条款",
  description: "RuleHub 服务条款：网站使用规则、知识产权、免责声明与用户责任。",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Breadcrumbs items={[{ label: "服务条款" }]} />

      <article className="mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-muted-foreground">
        <header className="border-b border-border pb-6">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">服务条款</h1>
          <p className="mt-3">最后更新：{LEGAL_LAST_UPDATED}</p>
          <p className="mt-4">
            欢迎使用 {SITE_NAME}（{SITE_URL}）。访问或使用本网站，即表示您同意受本服务条款约束。若不同意，请停止使用本网站。
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">1. 服务说明</h2>
          <p>
            {SITE_NAME} 由 {SITE_OPERATOR} 运营，提供 Agent Skills 索引与浏览、VibeCoding 项目鉴赏、AI
            行业资讯聚合及相关文档服务。本网站索引的 Skills 内容来自 GitHub 等第三方公开来源；新闻资讯来自 Hacker
            News 等公开渠道并注明来源链接。
          </p>
          <p>
            本网站可能包含第三方广告（如 Google AdSense）。广告内容由广告商负责，不代表 {SITE_NAME} 立场。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">2. 账户与访问</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>部分功能可能需要第三方 OAuth 登录（如 GitHub）。您须保证账户信息真实合法。</li>
            <li>您应对账户下的活动负责，并妥善保管登录凭证。</li>
            <li>我们保留在违反本条款时限制或终止访问的权利。</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">3. 可接受的使用</h2>
          <p>使用本网站时，您同意不会：</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>以自动化方式过度抓取、爬取或干扰网站正常运行</li>
            <li>尝试未经授权访问系统、数据或其他用户账户</li>
            <li>上传或传播恶意代码、垃圾信息或违法内容</li>
            <li>侵犯他人知识产权、隐私权或其他合法权益</li>
            <li>将本网站用于任何违反适用法律法规的活动</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">4. 第三方内容与 Skills</h2>
          <p>
            本网站展示的 Agent Skills、README、新闻摘要及外部链接均来自第三方。{SITE_NAME}{" "}
            不对第三方内容的准确性、完整性、安全性、合法性或可用性作任何明示或暗示的保证。
          </p>
          <p>
            在安装或使用任何 Skill 或访问外部链接前，您应自行审查源代码与条款。因使用第三方内容导致的任何损失，{SITE_NAME}{" "}
            不承担责任。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">5. 知识产权</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              本网站的界面设计、原创文案、Logo 及汇编结构受著作权法保护，归 {SITE_OPERATOR} 或相应权利人所有。
            </li>
            <li>第三方 Skills、文章及商标归各自权利人所有，本网站仅作索引或摘要展示并保留来源链接。</li>
            <li>
              若您认为本网站内容侵犯您的权利，请通过{" "}
              <Link href="/contact" className="text-primary hover:underline">
                联系我们
              </Link>{" "}
              提交书面通知，我们将依法处理。
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">6. API 与速率限制</h2>
          <p>
            若本网站提供公开或认证 API，您须遵守文档中的速率限制与使用规范。滥用 API（如恶意刷量、绕过限制）可能导致访问被暂停或终止。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">7. 免责声明</h2>
          <p>
            本网站按「现状」（AS IS）及「可用性」提供，不提供任何明示或暗示的保证，包括但不限于适销性、特定用途适用性或不侵权保证。
          </p>
          <p>
            {SITE_NAME} 与 Anthropic、OpenAI、Google、GitHub 或任何 AI / 技术公司均无官方关联。Skills
            名称、商标归各自所有者所有。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">8. 责任限制</h2>
          <p>
            在适用法律允许的最大范围内，{SITE_OPERATOR} 及 {SITE_NAME}{" "}
            不对因使用或无法使用本网站而产生的任何间接、附带、特殊、后果性或惩罚性损害承担责任，包括数据丢失、利润损失或业务中断。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">9. 外链</h2>
          <p>
            本网站包含指向第三方网站的链接，仅为方便用户。我们不对第三方网站的内容、隐私政策或做法负责。访问外链的风险由您自行承担。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">10. 条款变更</h2>
          <p>
            我们可随时修订本条款。修订后版本发布于本页面即生效。继续使用本网站视为接受修订后的条款。建议您定期查阅本页。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">11. 适用法律与争议</h2>
          <p>
            本条款的解释与适用受运营者所在地适用法律管辖。因本条款引起的争议，双方应首先友好协商；协商不成的，提交有管辖权的法院解决。
          </p>
        </section>

        <section className="space-y-3 border-t border-border pt-6">
          <h2 className="text-lg font-semibold text-foreground">12. 联系我们</h2>
          <p>
            有关本条款的问题，请联系{" "}
            <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="text-primary hover:underline">
              {SITE_CONTACT_EMAIL}
            </a>
            或访问{" "}
            <Link href="/contact" className="text-primary hover:underline">
              联系我们
            </Link>
            。
          </p>
        </section>
      </article>
    </div>
  );
}
