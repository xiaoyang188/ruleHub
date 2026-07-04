export const LOCALES = ["ar", "de", "en", "es", "fr", "ja", "ko", "pt", "zh"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "zh";

export function withLocale(path: string, locale: Locale): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;

  if (locale === "en") return normalized;
  if (locale === "zh") {
    if (normalized === "/") return "/zh";
    return `/zh${normalized}`;
  }
  if (normalized === "/") return `/${locale}`;
  return `/${locale}${normalized}`;
}

export function stripLocale(pathname: string): { locale: Locale | null; pathname: string } {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (first && LOCALES.includes(first as Locale)) {
    const rest = segments.slice(1).join("/");
    return {
      locale: first as Locale,
      pathname: rest ? `/${rest}` : "/",
    };
  }

  return { locale: null, pathname: pathname || "/" };
}

export function getLocaleFromPathname(pathname: string): Locale {
  return stripLocale(pathname).locale ?? DEFAULT_LOCALE;
}
