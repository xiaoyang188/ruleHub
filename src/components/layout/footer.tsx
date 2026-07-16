import Link from "next/link";

const FOOTER_LINKS = {
  resources: [
    { href: "/docs", label: "文档中心" },
    { href: "/insights", label: "洞察专栏" },
    { href: "/changelog", label: "更新日志" },
  ],
  legal: [
    { href: "/about", label: "关于我们" },
    { href: "/contact", label: "联系我们" },
    { href: "/privacy", label: "隐私政策" },
    { href: "/terms", label: "服务条款" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-12 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground">RuleHub</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Agent Skills 市场与 AI 编程灵感
          </p>
        </div>

        <div className="mt-10 space-y-8 text-center">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">资源</h3>
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">法律信息</h3>
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground/70">
          <p>
            © {new Date().getFullYear()} RuleHub. 独立社区项目，与 Anthropic、OpenAI 无关联。
          </p>
        </div>
      </div>
    </footer>
  );
}
