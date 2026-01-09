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

// ✅ Metadados Open Graph e Twitter
export const metadata = {
  title: "Meu Site Multilíngue",
  description: "Um site moderno com suporte a múltiplos idiomas e dark mode inteligente.",
  openGraph: {
    title: "Meu Site Multilíngue",
    description: "Um site moderno com suporte a múltiplos idiomas e dark mode inteligente.",
    url: "https://seusite.com",
    siteName: "Meu Site",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Imagem social do site",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meu Site Multilíngue",
    description: "Um site moderno com suporte a múltiplos idiomas e dark mode inteligente.",
    images: ["/og-image.png"],
  },
};

export default async function Layout({ children, params }: LayoutProps) {
  const { lang } = params;
  const dict = translations[lang];

  return (
    <html lang={lang}>
      <head>
        {/* Script inline minificado para aplicar tema antes da hidratação */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){try{var e=document.cookie.split("; ").find(e=>e.startsWith("theme="))?.split("=")[1]||"system",t=window.matchMedia("(prefers-color-scheme: dark)").matches,n="dark"===e||"system"===e&&t;n?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}catch(e){}}();`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased transition-colors duration-300">
        <PageWrapper lang={lang}>
          {/* Cabeçalho multilíngue */}
          <Header dict={dict} lang={lang} />

          {/* Conteúdo principal flexível */}
          <main className="flex-1 w-full max-w-7xl mx-auto p-4">{children}</main>

          {/* Rodapé multilíngue */}
          <Footer dict={dict} lang={lang} />
        </PageWrapper>
      </body>
    </html>
  );
}
