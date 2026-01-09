// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en", "pt", "es"];
const defaultLocale = "pt";

function getLocale(request: NextRequest): string {
  // 1️⃣ Prioriza cookie
  const cookieLocale = request.cookies.get("locale")?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2️⃣ Fallback para Accept-Language
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  try {
    return matchLocale(languages, locales, defaultLocale);
  } catch {
    return defaultLocale;
  }
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
    console.log("[middleware] Falha ao enviar log externo:", error);
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const theme = request.cookies.get("theme")?.value || "system";

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // 🔎 Log assíncrono
    sendLog(locale, pathname, theme);

    return NextResponse.redirect(
      new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url)
    );
  }

  // ✅ Injeta cabeçalho de tema para SSR
  const res = NextResponse.next();
  res.headers.set("x-theme", theme);
  return res;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|.*\\.(png|svg|jpg|jpeg|webp)).*)",
  ],
};
