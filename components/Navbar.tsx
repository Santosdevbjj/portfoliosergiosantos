"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { Locale, getDictionary } from "@/lib/i18n";

interface Props {
  lang: Locale;
}

export default function Navbar({ lang }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Como a Navbar é usada no PageWrapper (Client), buscamos o dicionário de forma síncrona
  const t = getDictionary(lang);

  // Efeito para mudar o fundo da navbar ao rolar a página
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LOGO / NOME */}
          <div className="flex-shrink-0">
            <Link 
              href={`/${lang}`} 
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              Sérgio Santos
            </Link>
          </div>

          {/* LINKS DE NAVEGAÇÃO (DESKTOP) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href={`/${lang}`} className="text-sm font-medium hover:text-blue-600 transition-colors">
              {t.navigation.home}
            </Link>
            <Link href="#projects-title" className="text-sm font-medium hover:text-blue-600 transition-colors">
              {t.navigation.projects}
            </Link>
            <a 
              href={t.cv.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Curriculum
            </a>
          </div>

          {/* SELETOR DE IDIOMA */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher lang={lang} dict={t.navigation} />
          </div>
        </div>
      </div>
    </nav>
  );
}
