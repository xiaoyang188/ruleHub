import { DocCodeBlock, DocH2, DocLink, DocsLayout } from "@/components/docs/docs-layout";
import { siteFeatures } from "@/lib/site-features";

export default function ApiDocsPage() {
  return (
    <DocsLayout
      title="API 文档"
      description="RuleHub 提供与 SkillsMP 兼容的 REST API，用于搜索与发现 Agent Skills。"
      breadcrumbs={[
        { label: "文档", href: "/docs" },
        { label: "API" },
      ]}
    >
      <section className="space-y-4">
        <DocH2>Base URL</DocH2>
        <DocCodeBlock>https://skillsmp.com</DocCodeBlock>
        <p>
          RuleHub 搜索页通过本地代理 <DocLink href="/api/skills/search">/api/skills/search</DocLink>{" "}
          调用上游索引，无需 API Key 即可试用。
        </p>
      </section>

      <section className="space-y-4">
        <DocH2>搜索 Skills</DocH2>
        <DocCodeBlock>{`GET /api/v1/skills/search?q=关键词

# 参数
# q        必填，搜索关键词
# page     页码，默认 1
# limit    每页条数，默认 20，最大 100
# sortBy   stars | recent
# category 分类 slug，如 data-ai
# occupation 职业 slug`}</DocCodeBlock>
      </section>

      <section className="space-y-4">
        <DocH2>示例</DocH2>
        <DocCodeBlock>{`curl "https://skillsmp.com/api/v1/skills/search?q=cursor&limit=10&sortBy=stars"${
          siteFeatures.showApiAuthDocs
            ? `

# 带 API Key（更高配额）
curl "https://skillsmp.com/api/v1/skills/search?q=automation" \\
  -H "Authorization: Bearer sk_live_your_api_key"`
            : ""
        }`}</DocCodeBlock>
      </section>

      {siteFeatures.showApiAuthDocs && (
        <section className="space-y-4">
          <DocH2>配额</DocH2>
          <ul className="list-inside list-disc space-y-2">
            <li>匿名：50 次/天</li>
            <li>登录用户：500 次/天</li>
            <li>API Key：按套餐提升</li>
          </ul>
        </section>
      )}
    </DocsLayout>
  );
}
