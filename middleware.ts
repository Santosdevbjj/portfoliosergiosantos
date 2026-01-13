import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Negotiator from "negotiator";
import { match as matchLocale } from "@formatjs/intl-localematcher";

const locales = ["pt", "en", "es"] as const;
const defaultLocale = "pt";

/**
 * 🕵️ Detecta o melhor idioma baseado em Cookies ou Headers do Navegador
 */
function getLocale(request: NextRequest): string {
  // 1. Prioridade Máxima: Cookie (Decisão explícita do usuário via LanguageSwitcher)
  const cookieLocale = request.cookies.get("locale")?.value?.toLowerCase();
  if (cookieLocale && (locales as readonly string[]).includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Fallback: Negociação de Idioma do Navegador
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  try {
    const languages = new Negotiator({ headers }).languages();
    // Garante que passamos uma cópia mutável do array para o matcher
    return matchLocale(languages, [...locales], defaultLocale);
  } catch (e) {
    return defaultLocale;
  }
}

/**
 * 📊 Envio de logs para monitoramento de tráfego e preferências
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
        service: "portfolio-middleware",
        level: "info",
        locale,
        theme,
        path: pathname,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    // Fail silent para não afetar a experiência do usuário
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const theme = request.cookies.get("theme")?.value ?? "system";

  // 🛡️ Filtro de Exclusão: Ignora arquivos internos, imagens e metadados de sistema
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.match(/\.(png|jpg|jpeg|svg|webp|gif|ico|pdf|txt)$/)
  ) {
    return NextResponse.next();
  }

  // Verifica se o pathname já possui um locale válido no início
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    
    // Dispara log sem travar a requisição principal (fire and forget)
    if (process.env.LOGTAIL_TOKEN) {
      sendLog(locale, pathname, theme).catch(() => {});
    }

    // Redirecionamento limpo para o idioma detectado
    const redirectUrl = new URL(
      `/${locale}${pathname === "/" ? "" : pathname}`,
      request.url
    );
    
    return NextResponse.redirect(redirectUrl);
  }

  // 🔄 Injeção de Headers para facilitar leitura nos Server Components/Layouts
  const response = NextResponse.next();
  const currentLocale = pathname.split("/")[1] || defaultLocale;

  response.headers.set("x-theme", theme);
  response.headers.set("x-locale", currentLocale);
  response.headers.set("x-pathname", pathname);

  return response;
}

export const config = {
  // Otimização do matcher para cobrir todas as páginas exceto pastas de assets
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|robots.txt|sitemap.xml|sw.js).*)",
  ],
};
