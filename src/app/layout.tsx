import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/layout/floating-actions";
import { RouteProgress } from "@/components/layout/route-progress";

export const metadata: Metadata = {
  title: "Agent Skills Marketplace | Claude & Codex Skills | RuleHub",
  description:
    "发现适用于 Claude Code、Codex、ChatGPT 以及所有 SKILL.md 工具的开源 agent skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" className="dark">
      <body className="min-h-screen antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to main content
        </a>
        <RouteProgress />
        <Header />
        <main id="main-content" className="relative overflow-x-clip pt-16">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
