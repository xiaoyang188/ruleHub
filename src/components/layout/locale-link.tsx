"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, withLocale, type Locale } from "@/lib/locale";

export function useLocale(): Locale {
  const pathname = usePathname();
  return getLocaleFromPathname(pathname);
}

export function LocaleLink({
  href,
  className,
  children,
  onClick,
  ...rest
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
} & Omit<React.ComponentProps<typeof Link>, "href">) {
  const locale = useLocale();
  const localizedHref = href.startsWith("http") ? href : withLocale(href, locale);

  return (
    <Link href={localizedHref} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}
