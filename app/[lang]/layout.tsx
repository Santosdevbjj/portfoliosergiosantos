// app/[lang]/layout.tsx
import type { ReactNode } from "react";
import { translations } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";

interface LayoutProps {
  children: ReactNode;
  params: { lang: "pt" | "en" | "es" };
}

// ✅ Metadados dinâmicos por idioma
export async function generateMetadata({ params }: { params: { lang: "pt" | "en" | "es" } }) {
  const { lang } = params;
  const dict = translations[lang];

  // Seleciona imagem social correta por idioma
  const image =
    lang === "pt"
      ? "/og-image-pt.png"
      : lang === "en"
      ? "/og-image-en.png"
      : "/og-image-es.png";

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `https://seusite.com/${lang}`,
      siteName: "Sergio Santos Portfolio",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt:
            lang === "pt"
              ? "Sergio Santos - Analista de Dados"
              : lang === "en"
              ? "Sergio Santos - Data Science Analyst"
              : "Sergio Santos - Analista de Ciencia de Datos",
        },
      ],
      locale: lang === "pt" ? "pt_BR" : lang === "en" ? "en_US" : "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: [image],
    },
  };
}

export default async function Layout({ children, params }: LayoutProps) {
  const { lang } = params;
  const dict = translations[lang];

  return (
    <html lang={lang}>
      <head>
        {/* ✅ Bootstrap inline minificado para aplicar tema antes da hidratação */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){try{var e=document.cookie.split("; ").find(e=>e.startsWith("theme="))?.split("=")[1]||"system",t=window.matchMedia("(prefers-color-scheme: dark)").matches,n="dark"===e||"system"===e&&t;n?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}catch(e){}}();`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased transition-colors duration-300">
        <PageWrapper lang={lang}>
          {/* Cabeçalho multilíngue e responsivo */}
          <Header dict={dict} lang={lang} />

          {/* Conteúdo principal flexível e centralizado */}
          <main
            role="main"
            className="flex-1 w-full max-w-7xl mx-auto p-4"
          >
            {children}
          </main>

          {/* Rodapé multilíngue e responsivo */}
          <Footer dict={dict} lang={lang} />
        </PageWrapper>
      </body>
    </html>
  );
}
