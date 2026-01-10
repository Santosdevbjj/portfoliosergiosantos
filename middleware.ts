// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en", "pt", "es"];
const defaultLocale = "pt";

function getLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get("locale")?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  return matchLocale(languages || [], locales, defaultLocale);
}

async function sendLog(locale: string, pathname: string, theme: string) {
  try {
    await fetch("https://in.logtail.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LOGTAIL_TOKEN}`,
      },
      body: JSON.stringify({
        service: "middleware",
        level: "info",
        message: `Idioma: ${locale} | Tema: ${theme} | Path: ${pathname}`,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.warn("[middleware] Falha ao enviar log externo:", error);
  }
}

function redirectWithLocale(request: NextRequest, locale: string) {
  const pathname = request.nextUrl.pathname;
  return NextResponse.redirect(
    new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url)
  );
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const theme = request.cookies.get("theme")?.value || "system";

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    void sendLog(locale, pathname, theme); // fire-and-forget
    return redirectWithLocale(request, locale);
  }

  const res = NextResponse.next();
  res.headers.set("x-theme", theme);
  res.headers.set("x-locale", pathname.split("/")[1] || defaultLocale);
  return res;
}

export const config = {
  matcher: [
    "/((?!api|_next/|favicon.ico|sw.js|.*\\.(png|svg|jpg|jpeg|webp)).*)",
  ],
};
