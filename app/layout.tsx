import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import enDict from "./dictionaries/en.json";
import ptDict from "./dictionaries/pt.json";
import esDict from "./dictionaries/es.json";
import { usePathname } from "next/navigation";

// Metadados globais
export const metadata: Metadata = {
  title: "Portfólio Sergio Santos",
  description: "Analytics Engineer | Data Science | Portfólio Multilíngue",
  openGraph: {
    title: "Portfólio Sergio Santos",
    description: "Analytics Engineer | Data Science | Portfólio Multilíngue",
    url: "https://seuusuario.github.io/portfoliosergiosantos",
    siteName: "Portfólio Sergio Santos",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Portfólio Sergio Santos"
      }
    ],
    locale: "pt_BR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfólio Sergio Santos",
    description: "Analytics Engineer | Data Science | Portfólio Multilíngue",
    images: ["/og-image.png"]
  }
};

// Map de dicionários
const dictionaries: Record<string, any> = {
  pt: ptDict,
  en: enDict,
  es: esDict
};

// Função auxiliar para detectar idioma da rota
function detectLang(pathname: string | null): string {
  if (!pathname) return "en";
  const segments = pathname.split("/");
  const langSegment = segments[1];
  if (["pt", "en", "es"].includes(langSegment)) return langSegment;
  return "en"; // fallback
}

// Hook para carregar o dicionário correto
function useDictionary(pathname: string | null) {
  const lang = detectLang(pathname);
  return dictionaries[lang] || enDict;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const lang = detectLang(pathname);
  const dictionary = useDictionary(pathname);

  return (
    <html lang={lang} dir="ltr" className="scroll-smooth">
      <body className="flex min-h-screen flex-col bg-surface-light text-gray-900 dark:bg-surface-dark dark:text-gray-100 transition-colors duration-300">
        {/* Header recebe dicionário */}
        <Header dictionary={dictionary} />

        {/* Conteúdo principal responsivo */}
        <main className="flex-grow mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>

        {/* Footer recebe dicionário */}
        <Footer dictionary={dictionary} />
      </body>
    </html>
  );
}
