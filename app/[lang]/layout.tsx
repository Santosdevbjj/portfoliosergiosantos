// app/[lang]/layout.tsx
import type { ReactNode } from "react";
import { translations } from "@/lib/i18n"; // ✅ alinhado com page.tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";

interface LayoutProps {
  children: ReactNode;
  params: { lang: "pt" | "en" | "es" }; // ✅ inclui espanhol
}

export default async function Layout({ children, params }: LayoutProps) {
  const { lang } = params;

  // Carrega dicionário multilíngue
  const dict = translations[lang];

  return (
    <PageWrapper lang={lang}>
      {/* Cabeçalho multilíngue e responsivo */}
      <Header dict={dict} lang={lang} />

      {/* Conteúdo principal flexível e centralizado */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4">
        {children}
      </main>

      {/* Rodapé multilíngue e responsivo */}
      <Footer dict={dict} lang={lang} />
    </PageWrapper>
  );
}
