import { NextResponse } from "next/server";

// Dicionários multilíngues
const messages = {
  en: {
    greeting: "Hello, welcome to Sergio Santos' portfolio!",
    description: "This API endpoint is fully responsive and multilingual.",
    footer: "All rights reserved."
  },
  pt: {
    greeting: "Olá, bem-vindo ao portfólio de Sergio Santos!",
    description: "Este endpoint de API é totalmente responsivo e multilíngue.",
    footer: "Todos os direitos reservados."
  }
};

// Função para detectar idioma a partir da URL ou cabeçalho
function detectLang(req: Request): "en" | "pt" {
  const url = new URL(req.url);
  const pathSegments = url.pathname.split("/");
  const langSegment = pathSegments[1];

  if (langSegment === "pt") return "pt";
  if (langSegment === "en") return "en";

  // fallback: tenta pelo cabeçalho Accept-Language
  const acceptLang = req.headers.get("accept-language");
  if (acceptLang?.startsWith("pt")) return "pt";

  return "en";
}

// Handler GET
export async function GET(req: Request) {
  const lang = detectLang(req);
  const body = {
    lang,
    ...messages[lang],
    responsive: true,
    timestamp: new Date().toISOString()
  };

  return NextResponse.json(body, { status: 200 });
}
