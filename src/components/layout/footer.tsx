import Link from "next/link";

const FOOTER_LINKS = {
  community: [
    { href: "https://twitter.com", label: "Twitter" },
    { href: "https://reddit.com", label: "Reddit" },
  ],
  resources: [
    { href: "/docs", label: "📚 Skills 文档" },
    { href: "/timeline", label: "📈 洞察" },
    { href: "/docs/skill", label: "📄 Skill 文档" },
    { href: "/docs/official", label: "📁 官方 Skills" },
    { href: "/docs/codex", label: "📄 Codex Skills 文档" },
    { href: "/docs/spec", label: "📋 Agent Skills 规范" },
  ],
  legal: [
    { href: "/about", label: "📄 关于我们" },
    { href: "/changelog", label: "📋 更新日志" },
    { href: "/privacy", label: "🔒 隐私政策" },
    { href: "/terms", label: "📜 服务条款" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-16 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Skills Marketplace</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            发现并探索由社区构建的 Agent Skills
          </p>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">社区</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.community.map((link) => (
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
            <h3 className="mb-4 text-sm font-semibold text-foreground">资源</h3>
            <ul className="space-y-2">
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
            <h3 className="mb-4 text-sm font-semibold text-foreground">法律信息</h3>
            <ul className="space-y-2">
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

        <div className="mt-12 border-t border-border pt-8 text-center text-xs text-muted-foreground/70">
          <p>
            © {new Date().getFullYear()} RuleHub. 独立社区项目，与 Anthropic、OpenAI 无关联。
          </p>
        </div>
      </div>
    </footer>
  );
}
