"use client";

import Link from "next/link";
import {
  BookOpen,
  BriefcaseBusiness,
  LogIn,
  Menu,
  Moon,
  Package,
  Search,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LocaleLink } from "@/components/layout/locale-link";
import { LANGUAGES } from "@/data/mock";
import { stripLocale, withLocale, type Locale } from "@/lib/locale";
import { siteFeatures } from "@/lib/site-features";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/search", label: "搜索", icon: Search, highlight: true },
  { href: "/skills", label: "Skills", icon: Package },
  { href: "/vibecoding", label: "VibeCoding", icon: Sparkles },
  { href: "/creators", label: "创作者", icon: Users },
  { href: "/occupations", label: "职业技能", icon: BriefcaseBusiness },
  { href: "/docs", label: "文档", icon: BookOpen },
] as const;

function NavPill({
  href,
  label,
  icon: Icon,
  highlight,
  onClick,
}: {
  href: string;
  label: string;
  icon: typeof Search;
  highlight?: boolean;
  onClick?: () => void;
}) {
  return (
    <LocaleLink
      href={href}
      onClick={onClick}
      className={cn(
        "group flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium transition-all duration-200 active:scale-95",
        highlight
          ? "animate-pulse-border-primary border-primary/50 bg-card text-foreground hover:border-primary hover:bg-primary/10"
          : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-muted/50"
      )}
    >
      <Icon
        className={cn("h-4 w-4", highlight ? "text-primary" : "text-blue-500")}
      />
      <span>{label}</span>
    </LocaleLink>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const { pathname: barePath } = stripLocale(pathname);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border before:absolute before:inset-0 before:-z-10 before:bg-background/80 before:backdrop-blur-sm">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
          <LocaleLink
            href="/"
            className="group flex cursor-pointer items-center transition-opacity hover:opacity-90"
            aria-label="RuleHub home"
          >
            <div className="flex items-baseline">
              <span className="text-lg font-extrabold tracking-tight text-foreground sm:text-xl">
                rule
              </span>
              <span className="text-lg font-extrabold tracking-tight text-primary sm:text-xl">
                hub
              </span>
            </div>
          </LocaleLink>

          <nav className="hidden items-center justify-center gap-3 lg:flex">
            {NAV_ITEMS.map((item) => (
              <NavPill key={item.href} {...item} />
            ))}
          </nav>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              aria-label="切换到深色"
              className="hidden rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground lg:inline-flex"
            >
              <Moon className="h-4 w-4" />
            </button>

            <div className="relative hidden lg:block">
              <button
                type="button"
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-muted/50"
              >
                <span aria-hidden>🇨🇳</span>
                中文
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-border bg-card py-2 shadow-xl">
                  {LANGUAGES.map((lang) => (
                    <Link
                      key={lang.code}
                      href={withLocale(barePath, lang.code as Locale)}
                      className={cn(
                        "block px-4 py-2 text-sm transition-colors hover:bg-muted/50",
                        lang.current ? "text-primary" : "text-muted-foreground"
                      )}
                      onClick={() => setLangOpen(false)}
                    >
                      {lang.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {siteFeatures.showAuth && (
              <LocaleLink
                href="/auth/login"
                className="group hidden items-center gap-2 rounded-lg border border-primary/50 bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary hover:bg-primary/10 active:scale-95 lg:flex"
              >
                <LogIn className="h-4 w-4 text-primary" />
                登录
              </LocaleLink>
            )}

            <button
              type="button"
              className="rounded-lg p-2 text-foreground lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="菜单"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-background px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <NavPill
                key={item.href}
                {...item}
                onClick={() => setMenuOpen(false)}
              />
            ))}
            {siteFeatures.showAuth && (
              <LocaleLink
                href="/auth/login"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg border border-primary/50 px-3 py-2.5 text-sm font-medium"
                onClick={() => setMenuOpen(false)}
              >
                <LogIn className="h-4 w-4 text-primary" />
                登录
              </LocaleLink>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
