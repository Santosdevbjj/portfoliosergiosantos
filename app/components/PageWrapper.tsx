"use client";

import { ReactNode } from "react";
import Head from "next/head";
import type { Locale } from "@/lib/i18n";

interface Props {
  children: ReactNode;
  lang?: Locale; // idioma atual opcional
  title?: string; // título dinâmico
  description?: string; // descrição dinâmica
}

export default function PageWrapper({
  children,
  lang = "pt",
  title = "Meu Site Multilíngue",
  description = "Um site moderno com suporte a múltiplos idiomas e dark mode inteligente.",
}: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Open Graph básico */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />

        {/* Twitter Card básico */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>

      <main
        role="main"
        lang={lang === "en" ? "en-US" : lang === "es" ? "es-ES" : "pt-BR"}
        aria-label={
          lang === "en"
            ? "Main content"
            : lang === "es"
            ? "Contenido principal"
            : "Conteúdo principal"
        }
        className="min-h-screen w-full flex flex-col flex-1 transition-colors duration-500 
                   px-4 sm:px-6 lg:px-8 
                   bg-gray-50 dark:bg-gray-900"
      >
        {children}
      </main>
    </>
  );
}
