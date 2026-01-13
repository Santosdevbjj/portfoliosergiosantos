"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { Locale, getDictionary } from "@/lib/i18n";

interface Props {
  lang: Locale;
}

export default function Navbar({ lang }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const t = getDictionary(lang);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lógica para determinar se o link de projetos deve ser uma âncora ou um link completo
  const isHomePage = pathname === `/${lang}` || pathname === `/${lang}/`;
  const projectsHref = isHomePage ? "#projects-title" : `/${lang}#projects-title`;

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        isScrolled 
          ? "py-3 bg-white/70 dark:bg-slate-950/70 backdrop-blur-lg shadow-lg border-b border-slate-200/50 dark:border-slate-800/50" 
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* LOGO COM IDENTIDADE VISUAL */}
          <div className="flex-shrink-0 group">
            <Link 
              href={`/${lang}`} 
              className="flex flex-col leading-none"
            >
              <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
                SÉRGIO SANTOS
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                Data & Software
              </span>
            </Link>
          </div>

          {/* LINKS DE NAVEGAÇÃO */}
          <div className="hidden md:flex items-center space-x-10">
            <Link 
              href={`/${lang}`} 
              className={`text-sm font-semibold transition-all hover:text-blue-600 ${
                isHomePage ? "text-blue-600" : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {t.navigation.home}
            </Link>
            
            <Link 
              href={projectsHref} 
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-all"
            >
              {t.navigation.projects}
            </Link>

            {/* Link para página dinâmica MDX se existir */}
            <Link 
              href={`/${lang}/about`} 
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-all"
            >
              {lang === "en" ? "About" : lang === "es" ? "Sobre mí" : "Sobre"}
            </Link>
          </div>

          {/* ACTIONS: IDIOMA + CV */}
          <div className="flex items-center gap-6">
            <a 
              href={`/cv-sergio-santos-${lang}.pdf`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hidden sm:block text-xs font-bold uppercase tracking-widest px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-full hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
            >
              CV
            </a>
            <LanguageSwitcher lang={lang} dict={t.navigation} />
          </div>
        </div>
      </div>
    </nav>
  );
}
