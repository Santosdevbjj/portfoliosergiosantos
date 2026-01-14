"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import type { Translations, Locale } from "@/lib/i18n";

interface FooterProps {
  lang: Locale;
  navigation: Translations["navigation"];
  footer: Translations["footer"];
}

export default function Footer({ lang, navigation, footer }: FooterProps) {
  // Evita erro de hidratação garantindo que o ano só apareça no cliente
  const [year, setYear] = useState<number | string>("...");

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const htmlLangMap = { en: "en-US", es: "es-ES", pt: "pt-BR" };

  return (
    <footer
      className="w-full border-t border-slate-100 dark:border-slate-800/50 bg-white dark:bg-slate-950 transition-colors relative overflow-hidden"
      aria-label="Site footer"
      lang={htmlLangMap[lang]}
    >
      {/* Detalhe de luz sutil no fundo */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          
          {/* COLUNA 1: IDENTIDADE (5/12) */}
          <div className="md:col-span-5 space-y-6 text-center md:text-left">
            <Link
              href={`/${lang}`}
              className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase"
            >
              Sérgio Santos
            </Link>
            <p className="text-base text-slate-500 dark:text-slate-400 max-w-sm mx-auto md:mx-0 font-medium leading-relaxed">
              {footer.description || "Data & Software Engineering specialist focused on scalable architectures and business intelligence."}
            </p>
          </div>

          {/* COLUNA 2: NAVEGAÇÃO RÁPIDA (4/12) */}
          <nav className="md:col-span-4 flex flex-col items-center md:items-start space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">
              Navigation
            </h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {[
                { label: navigation.home, href: `/${lang}` },
                { label: navigation.about, href: `/${lang}/about` },
                { label: navigation.projects, href: `/${lang}/projects` }, // Apontando para os Cases
                { label: "GitHub List", href: `/${lang}/projects/list` },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all flex items-center gap-1 group"
                >
                  {link.label}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </nav>

          {/* COLUNA 3: SOCIAL (3/12) */}
          <div className="md:col-span-3 flex flex-col items-center md:items-end space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">
              Connect
            </h3>
            <div className="flex gap-3">
              <a
                href="https://github.com/Santosdevbjj"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white hover:-translate-y-1 transition-all"
                aria-label="GitHub"
              >
                <Github size={22} />
              </a>
              <a
                href="https://www.linkedin.com/in/santosdevbjj"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white hover:-translate-y-1 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={22} />
              </a>
              <a
                href="mailto:sergio.santos@exemplo.com"
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white hover:-translate-y-1 transition-all"
                aria-label="Email"
              >
                <Mail size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* LINHA INFERIOR: COPYRIGHT */}
        <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            © {year} Sérgio Santos — {footer.rights}
          </p>
          
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-[0.2em]">
              Next.js 15 • Tailwind • TypeScript
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
