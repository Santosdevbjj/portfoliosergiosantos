// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Negotiator from "negotiator";
import { match as matchLocale } from "@formatjs/intl-localematcher";

const locales = ["pt", "en", "es"] as const; // PT como primeiro para consistência
const defaultLocale = "pt";

function getLocale(request: NextRequest): string {
  // 1. Tenta pegar do Cookie (usuário já escolheu antes)
  const cookieLocale = request.cookies.get("locale")?.value?.toLowerCase();
  if (cookieLocale && (locales as unknown as string[]).includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Tenta detectar do Navegador
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  try {
    const languages = new Negotiator({ headers }).languages();
    return matchLocale(languages, [...locales], defaultLocale);
  } catch (e) {
    return defaultLocale;
  }
}

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
  } catch (error) {
    // Fail silent
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const theme = request.cookies.get("theme")?.value ?? "system";

  // Exclusões para não processar arquivos estáticos e API
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname.match(/\.(png|jpg|jpeg|svg|webp|gif|ico|pdf)$/)
  ) {
    return NextResponse.next();
  }

  // Verifica se a URL já começa com um dos locales suportados
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    
    // Log assíncrono
    if (process.env.LOGTAIL_TOKEN) {
        sendLog(locale, pathname, theme).catch(() => {});
    }

    // Redireciona para o idioma detectado (ex: /projeto -> /pt/projeto)
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url)
    );
  }

  const response = NextResponse.next();
  const currentLocale = pathname.split("/")[1] || defaultLocale;

  // Injeta headers para facilitar o uso nos Server Components
  response.headers.set("x-theme", theme);
  response.headers.set("x-locale", currentLocale);

  return response;
}

export const config = {
  matcher: [
    // Ignora caminhos internos do Next.js e arquivos na pasta public
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)",
  ],
};
