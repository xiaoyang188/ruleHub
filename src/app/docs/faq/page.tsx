import { FAQ_ITEMS } from "@/data/mock";
import { DocH2, DocsLayout } from "@/components/docs/docs-layout";

export default function DocsFaqPage() {
  return (
    <DocsLayout
      title="FAQ"
      description="关于 Agent Skills、RuleHub 与安装的常见问题。"
      breadcrumbs={[
        { label: "文档", href: "/docs" },
        { label: "FAQ" },
      ]}
    >
      <div className="space-y-8">
        {FAQ_ITEMS.map((item) => (
          <section key={item.id} className="space-y-2 border-b border-border pb-6 last:border-0">
            <DocH2>{item.question}</DocH2>
            <p>{item.answer}</p>
          </section>
        ))}
      </div>
    </DocsLayout>
  );
}
