"use client";

import { ReactNode } from "react";
import Navbar from "./Navbar"; // Certifique-se que o nome do arquivo é Navbar.tsx
import Footer from "./Footer"; // Certifique-se que o nome do arquivo é Footer.tsx

interface Props {
  children: ReactNode;
  lang: "pt" | "en" | "es";
}

export default function PageWrapper({ children, lang }: Props) {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar lang={lang} />
      
      {/* Animação suave de fade-in ao carregar a página */}
      <div className="animate-in fade-in duration-700">
        {children}
      </div>

      <Footer lang={lang} />
    </div>
  );
}
