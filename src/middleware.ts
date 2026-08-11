import { NextRequest, NextResponse } from "next/server";
import { LOCALES } from "@/lib/locale";
import { IS_PREVIEW_MODE } from "@/lib/site-features";

function pathWithoutLocale(pathname: string) {
  const segment = pathname.split("/")[1];
  if (segment && LOCALES.includes(segment as (typeof LOCALES)[number])) {
    return pathname.slice(`/${segment}`.length) || "/";
  }
  return pathname;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segment = pathname.split("/")[1];
  const hasLocale =
    segment && LOCALES.includes(segment as (typeof LOCALES)[number]);

  // Default locale (zh) uses bare paths; redirect legacy /zh/* URLs.
  if (segment === "zh") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = pathname.slice("/zh".length) || "/";
    const response = NextResponse.redirect(redirectUrl, 308);
    response.cookies.set("NEXT_LOCALE", "zh", { path: "/" });
    return response;
  }

  if (!hasLocale) {
    if (IS_PREVIEW_MODE && (pathname === "/login" || pathname.startsWith("/auth"))) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/";
      return NextResponse.redirect(redirectUrl);
    }

    const response = NextResponse.next();
    response.cookies.set("NEXT_LOCALE", "zh", { path: "/" });
    return response;
  }

  if (IS_PREVIEW_MODE) {
    const barePath = pathWithoutLocale(pathname);
    if (barePath === "/login" || barePath.startsWith("/auth")) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = hasLocale ? `/${segment}` : "/";
      return NextResponse.redirect(redirectUrl);
    }
  }

  const withoutLocale = pathname.slice(`/${segment}`.length) || "/";
  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = withoutLocale;

  const response = NextResponse.rewrite(rewriteUrl);
  response.cookies.set("NEXT_LOCALE", segment, { path: "/" });
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|ads.txt|robots.txt|sitemap.xml|.*\\..*).*)"],
};
