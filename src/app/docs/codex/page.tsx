import { DocH2, DocLink, DocsLayout } from "@/components/docs/docs-layout";

export default function CodexDocsPage() {
  return (
    <DocsLayout
      title="Codex Skills"
      description="适用于 OpenAI Codex 与相关 agent 工作流的 skills 说明。"
      breadcrumbs={[
        { label: "文档", href: "/docs" },
        { label: "Codex Skills" },
      ]}
    >
      <section className="space-y-4">
        <DocH2>什么是 Codex Skills？</DocH2>
        <p>
          Codex Skills 同样基于 SKILL.md 格式，面向软件开发、自动化测试、文档处理等工程任务。RuleHub
          将 Codex 与 Claude Skills 统一索引，可按平台筛选浏览。
        </p>
      </section>
      <section className="space-y-4">
        <DocH2>目录入口</DocH2>
        <p>
          访问 <DocLink href="/codex-skills">Codex Skills 目录</DocLink> 查看精选 skills，或使用{" "}
          <DocLink href="/search?q=codex">搜索</DocLink> 查找更多。
        </p>
      </section>
    </DocsLayout>
  );
}
