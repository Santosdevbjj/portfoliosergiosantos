import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Negotiator from "negotiator";
import { match as matchLocale } from "@formatjs/intl-localematcher";

const locales = ["pt", "en", "es"] as const;
const defaultLocale = "pt";

function getLocale(request: NextRequest): string {
  const cookieLocale = request.cookies
    .get("locale")
    ?.value
    ?.split("-")[0]
    ?.toLowerCase();

  if (cookieLocale && locales.includes(cookieLocale as any)) {
    return cookieLocale;
  }

  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  try {
    const languages = new Negotiator({ headers }).languages();
    // Garante que o matcher receba um array simples de strings
    return matchLocale(languages, Array.from(locales), defaultLocale);
  } catch {
    return defaultLocale;
  }
}

async function sendLog(
  locale: string,
  pathname: string,
  theme: string,
  request: NextRequest
) {
  // Apenas logs em produção e se houver token
  if (process.env.NODE_ENV !== "production" || !process.env.LOGTAIL_TOKEN) return;

  const ua = request.headers.get("user-agent") || "unknown";
  const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

  try {
    // Usamos fetch com keepalive para não segurar a requisição do usuário
    await fetch("https://in.logs.betterstack.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LOGTAIL_TOKEN}`,
      },
      body: JSON.stringify({
        dt: new Date().toISOString(),
        message: `Visit: ${pathname} [${locale}]`,
        service: "portfolio-sergio",
        level: "info",
        context: {
          locale,
          theme,
          path: pathname,
          user_agent: ua,
          client_ip: ip,
          runtime: "edge-middleware"
        },
      }),
      keepalive: true, // Importante para garantir o envio após a resposta
    });
  } catch (err) {
    // Fail silent para não interromper a navegação do usuário
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 1. Ignora rapidamente arquivos estáticos e internos
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.match(/\.(?:public|assets|ico|png|jpg|jpeg|svg|webp|gif|pdf|txt|xml|json|webmanifest|woff2?|ttf)$/)
  ) {
    return NextResponse.next();
  }

  const theme = request.cookies.get("theme")?.value ?? "system";
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // 2. Redireciona se não houver locale na URL
  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    
    // Log assíncrono (não usamos await para não atrasar o usuário)
    sendLog(locale, pathname, theme, request).catch(() => {});

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname === "/" ? "" : pathname}${request.nextUrl.search}`,
        request.url
      )
    );
  }

  // 3. Injeta headers úteis para Server Components
  const currentLocale = pathname.split("/")[1] || defaultLocale;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-theme", theme);
  requestHeaders.set("x-locale", currentLocale);
  requestHeaders.set("x-pathname", pathname);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  // Matcher otimizado para excluir o que não deve ser interceptado
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|.*\\.).*)"],
};
