// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Negotiator from "negotiator";
import { match as matchLocale } from "@formatjs/intl-localematcher";

/**
 * Idiomas suportados
 */
const locales = ["en", "pt", "es"] as const;
const defaultLocale = "pt";

/**
 * Detecta o locale:
 * 1. Cookie
 * 2. Accept-Language
 */
function getLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get("locale")?.value?.toLowerCase();

  if (cookieLocale && locales.includes(cookieLocale as any)) {
    return cookieLocale;
  }

  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  const languages = new Negotiator({ headers }).languages();
  return matchLocale(languages, [...locales], defaultLocale);
}

/**
 * Log externo opcional (não bloqueante)
 */
async function sendLog(locale: string, pathname: string, theme: string) {
  if (!process.env.LOGTAIL_TOKEN) return;

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
        message: `locale=${locale} theme=${theme} path=${pathname}`,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch {
    // nunca quebra o middleware
  }
}

/**
 * Middleware principal
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const theme = request.cookies.get("theme")?.value ?? "system";

  /**
   * Exclusões explícitas (SEM regex)
   */
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname === "/sw.js" ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".webp") ||
    pathname.endsWith(".gif") ||
    pathname.endsWith(".ico") ||
    pathname.endsWith(".pdf")
  ) {
    return NextResponse.next();
  }

  /**
   * Verifica se já existe locale na URL
   */
  const hasLocale = locales.some(
    (locale) =>
      pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (!hasLocale) {
    const locale = getLocale(request);

    sendLog(locale, pathname, theme).catch(() => {});

    return NextResponse.redirect(
      new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url)
    );
  }

  /**
   * Headers auxiliares
   */
  const response = NextResponse.next();
  const currentLocale = pathname.split("/")[1] ?? defaultLocale;

  response.headers.set("x-theme", theme);
  response.headers.set("x-locale", currentLocale);

  return response;
}

/**
 * Matcher SIMPLES e seguro
 * (o filtro real acontece dentro do código)
 */
export const config = {
  matcher: ["/:path*"],
};
