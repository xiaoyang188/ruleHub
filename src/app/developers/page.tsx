import { DocCodeBlock, DocH2, DocLink, DocsLayout } from "@/components/docs/docs-layout";

export default function DevelopersPage() {
  return (
    <DocsLayout
      title="开发者门户"
      description="REST API、OpenAPI 与 MCP 接入说明。"
      breadcrumbs={[{ label: "开发者" }]}
    >
      <section className="space-y-4">
        <DocH2>REST API</DocH2>
        <p>
          详见 <DocLink href="/docs/api">API 文档</DocLink>。RuleHub 本地代理路径：
        </p>
        <DocCodeBlock>{`GET /api/skills/search?q=cursor&sortBy=stars&limit=20`}</DocCodeBlock>
      </section>

      <section className="space-y-4">
        <DocH2>OpenAPI</DocH2>
        <p>完整 OpenAPI 规范可在 SkillsMP 开发者文档中获取（静态复刻阶段提供摘要说明）。</p>
      </section>

      <section className="space-y-4">
        <DocH2>MCP</DocH2>
        <p>
          可通过 MCP server 将 skills 搜索能力接入 Cursor、Claude Desktop 等支持 MCP 的客户端。配置示例将在后续版本提供。
        </p>
      </section>
    </DocsLayout>
  );
}
