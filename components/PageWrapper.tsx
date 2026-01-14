"use client";

import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Locale, getDictionary } from "@/lib/i18n";

interface Props {
  children: ReactNode;
  lang: Locale;
}

export default function PageWrapper({ children, lang }: Props) {
  // Buscamos o dicionário para passar aos componentes globais
  const dict = getDictionary(lang);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* ID "top" para permitir que o botão "Voltar ao topo" do Footer 
          funcione via âncora nativa 
      */}
      <div id="top" />

      <Navbar lang={lang} dict={dict} />
      
      {/* - flex-grow garante que o footer fique sempre no rodapé mesmo em páginas curtas
          - pt-20 (padding-top) evita que a Navbar fixa cubra o início do conteúdo
      */}
      <main className="flex-grow pt-20 animate-in fade-in slide-in-from-bottom-2 duration-1000 ease-out">
        {children}
      </main>

      <Footer lang={lang} />
    </div>
  );
}
