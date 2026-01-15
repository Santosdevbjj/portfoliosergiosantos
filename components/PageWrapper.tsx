"use client";

import { ReactNode, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Locale, getDictionary } from "@/lib/i18n";

interface Props {
  children: ReactNode;
  lang: Locale;
}

export default function PageWrapper({ children, lang }: Props) {
  const dict = getDictionary(lang);
  const [mounted, setMounted] = useState(false);

  // Evita conflitos de hidratação (tema, animações)
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500">
      
      {/* BACKGROUND DECORATIVO GLOBAL */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
      >
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/5 dark:bg-blue-600/[0.03] rounded-full blur-[120px]" />
        <div className="absolute top-[40%] -right-[5%] w-[30%] h-[50%] bg-blue-500/5 dark:bg-blue-500/[0.02] rounded-full blur-[100px]" />
      </div>

      {/* Âncora global para Back to Top */}
      <div id="top" className="absolute top-0 left-0 w-px h-px" />

      <Navbar lang={lang} dict={dict} />

      {/* CONTEÚDO PRINCIPAL */}
      <main
        role="main"
        className="flex-grow pt-20"
      >
        <div
          className={`
            transition-opacity duration-700 ease-out
            ${mounted ? "opacity-100" : "opacity-0"}
          `}
        >
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            {children}
          </div>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
