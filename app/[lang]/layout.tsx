// app/[lang]/layout.tsx
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { Locale, i18n } from "@/lib/i18n";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  children: React.ReactNode;
  params: { lang: Locale };
}

/* 🔎 Gerador de Metadados Dinâmicos para SEO */
export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const isPt = params.lang === "pt";
  const isEs = params.lang === "es";

  const title = isPt 
    ? "Sérgio Santos | Especialista em Dados e Software" 
    : isEs 
      ? "Sérgio Santos | Especialista en Datos y Software"
      : "Sérgio Santos | Data & Software Specialist";

  const description = isPt
    ? "Portfólio de engenharia de dados, IA e desenvolvimento de software."
    : "Portfolio de ingeniería de datos, IA y desarrollo de software.";

  return {
    title,
    description,
    viewport: "width=device-width, initial-scale=1",
    robots: "index, follow",
    alternates: {
      languages: {
        "pt-BR": "/pt",
        "en-US": "/en",
        "es-ES": "/es",
      },
    },
  };
}

/* 🚀 Função para gerar os caminhos estáticos no build */
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({ children, params }: Props) {
  return (
    <html lang={params.lang} className="scroll-smooth">
      <body
        className={`${inter.className} bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 antialiased min-h-screen flex flex-col`}
      >
        {/* O PageWrapper (que contém Navbar e Footer) será renderizado dentro do children em page.tsx */}
        {children}
      </body>
    </html>
  );
}
