"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import DarkModeToggle from "./DarkModeToggle";
import { Locale, Dictionary } from "@/lib/i18n";
import { Menu, X, ChevronRight } from "lucide-react";

interface Props {
  lang: Locale;
  dict: Dictionary;
}

export default function Navbar({ lang, dict }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fecha o menu ao mudar de rota ou ao clicar em âncora
  useEffect(() => {
    setIsMobileMenuOpen(false);
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'unset';
    }
  }, [pathname]);

  // Bloqueia scroll do body quando menu mobile está aberto
  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'unset';
  };

  const isHomePage = pathname === `/${lang}` || pathname === `/${lang}/`;
  
  // Sincronizado com a chave 'featuredProjects' do pt.json e HeroSection
  const projectsHref = isHomePage ? "#featuredProjects" : `/${lang}#featuredProjects`;

  const navLinks = [
    { name: dict.sections.about, href: `/${lang}`, active: isHomePage },
    { name: dict.sections.featuredProjects, href: projectsHref, active: false },
    { name: dict.sections.awards, href: isHomePage ? "#awards" : `/${lang}#awards`, active: false },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ease-in-out ${
        isScrolled 
          ? "py-3 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-2xl shadow-black/5 border-b border-slate-200/50 dark:border-slate-800/50" 
          : "py-6 bg-transparent"
      }`}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          <Link href={`/${lang}`} className="relative z-10 flex flex-col group active:scale-95 transition-transform">
            <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">
              SÉRGIO <span className="text-blue-600 transition-colors group-hover:text-blue-500">SANTOS</span>
            </span>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] transition-colors group-hover:text-slate-600 dark:group-hover:text-slate-200">
              {dict.categories.database}
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-blue-600 ${
                  link.active ? "text-blue-600" : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4 border-r border-slate-200 dark:border-slate-800 pr-4 mr-2">
               <DarkModeToggle dict={dict.theme} />
               <LanguageSwitcher lang={lang} />
            </div>

            <button 
              aria-expanded={isMobileMenuOpen}
              className="md:hidden p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 active:scale-90 transition-all"
              onClick={toggleMenu}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 top-[72px] w-full h-[calc(100vh-72px)] bg-white dark:bg-slate-950 p-6 z-[99] overflow-y-auto animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="space-y-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                onClick={toggleMenu}
                className="flex items-center justify-between text-2xl font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-900 pb-4"
              >
                {link.name}
                <ChevronRight className="text-blue-600" />
              </Link>
            ))}
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                   {dict.theme.themeSystem}
                </p>
                <DarkModeToggle dict={dict.theme} />
              </div>
              <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                   {lang.toUpperCase()}
                </p>
                <LanguageSwitcher lang={lang} />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
