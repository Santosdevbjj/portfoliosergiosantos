import { NextResponse } from "next/server";

// Força a rota a ser dinâmica, pois usamos headers e searchParams
export const dynamic = "force-dynamic";

type Locale = "en" | "pt" | "es";

const messages: Record<
  Locale,
  { greeting: (name: string) => string; description: string; footer: string }
> = {
  en: {
    greeting: (name: string) => `Hello, ${name}! Welcome to Sergio Santos' portfolio.`,
    description: "This advanced API endpoint is fully responsive and multilingual.",
    footer: "All rights reserved."
  },
  pt: {
    greeting: (name: string) => `Olá, ${name}! Bem-vindo ao portfólio de Sergio Santos.`,
    description: "Este endpoint avançado de API é totalmente responsivo e multilíngue.",
    footer: "Todos os direitos reservados."
  },
  es: {
    greeting: (name: string) => `¡Hola, ${name}! Bienvenido al portafolio de Sergio Santos.`,
    description: "Este endpoint avanzado de API es totalmente responsivo y multilingüe.",
    footer: "Todos los derechos reservados."
  }
};

/** 🌐 Detecta o idioma com prioridade em Query > Headers > Fallback */
function detectLang(req: Request): Locale {
  const { searchParams } = new URL(req.url);
  
  const langParam = searchParams.get("lang")?.toLowerCase();
  if (langParam === "pt" || langParam === "en" || langParam === "es") {
    return langParam as Locale;
  }

  // Cabeçalho personalizado 'x-locale'
  const xLocale = req.headers.get("x-locale"); 
  if (xLocale === "pt" || xLocale === "en" || xLocale === "es") return xLocale as Locale;

  // Detecção via navegador (Accept-Language)
  const acceptLang = req.headers.get("accept-language")?.toLowerCase();
  if (acceptLang?.includes("pt")) return "pt";
  if (acceptLang?.includes("es")) return "es";

  return "en";
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name") || "Guest";
    const lang = detectLang(req);

    const body = {
      status: "success",
      data: {
        lang,
        greeting: messages[lang].greeting(name),
        description: messages[lang].description,
        footer: messages[lang].footer,
        timestamp: new Date().toISOString(),
      },
      meta: {
        version: "1.1.0",
        server_region: process.env.VERCEL_REGION || "local",
        environment: process.env.NODE_ENV
      }
    };

    return NextResponse.json(body, {
      status: 200,
      headers: {
        // No Next 15, o cache de rotas dinâmicas é mais rigoroso
        "Cache-Control": "no-store, max-age=0", 
        "X-Content-Type-Options": "nosniff",
        "Access-Control-Allow-Origin": "*", // Permite chamadas de outros domínios se necessário
      },
    });
  } catch (error) {
    console.error("API Greeting Error:", error);
    return NextResponse.json(
      { status: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
