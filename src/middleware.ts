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

  if (IS_PREVIEW_MODE) {
    const barePath = pathWithoutLocale(pathname);
    if (barePath === "/login" || barePath.startsWith("/auth")) {
      const localeSegment = pathname.split("/")[1];
      const hasLocale =
        localeSegment && LOCALES.includes(localeSegment as (typeof LOCALES)[number]);
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = hasLocale ? `/${localeSegment}` : "/";
      return NextResponse.redirect(redirectUrl);
    }
  }

  const segment = pathname.split("/")[1];

  if (!segment || !LOCALES.includes(segment as (typeof LOCALES)[number])) {
    return NextResponse.next();
  }

  const withoutLocale = pathname.slice(`/${segment}`.length) || "/";
  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = withoutLocale;

  const response = NextResponse.rewrite(rewriteUrl);
  response.cookies.set("NEXT_LOCALE", segment, { path: "/" });
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
