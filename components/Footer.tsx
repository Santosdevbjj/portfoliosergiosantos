import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Locale, Dictionary } from "@/lib/i18n";
import {
  Github,
  Linkedin,
  ArrowUp,
  Code,
  Database,
} from "lucide-react";

interface FooterProps {
  lang: Locale;
  dict: Dictionary;
}

export default function Footer({ lang, dict }: FooterProps) {
  return (
    <footer
      role="contentinfo"
      className="
        relative mt-24 overflow-hidden
        border-t border-slate-200 dark:border-slate-800/60
        bg-white dark:bg-slate-950
      "
    >
      {/* Linha decorativa superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 items-start">
          {/* BRAND */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <Link
              href={`/${lang}`}
              className="
                text-2xl font-black tracking-tighter
                text-slate-900 dark:text-white
                hover:text-blue-600 transition-colors
              "
            >
              SÉRGIO SANTOS
            </Link>

            <div className="space-y-2 text-center md:text-left">
              <p className="flex items-center justify-center md:justify-start gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                <Database size={12} className="text-blue-600" />
                {dict.categories.database}
              </p>

              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                © {new Date().getFullYear()} — {dict.footer.rights}
              </p>
            </div>
          </div>

          {/* SOCIAL */}
          <div className="flex flex-col items-center space-y-8">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-600">
              {dict.footer.connect}
            </span>

            <div className="flex gap-12">
              <a
                href="https://github.com/Santosdevbjj"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="
                  group relative p-3 rounded-2xl
                  bg-slate-50 dark:bg-slate-900
                  hover:border-blue-500/30 border border-transparent
                  transition-all
                "
              >
                <Github
                  size={24}
                  className="text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors"
                />
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black uppercase tracking-tight opacity-0 group-hover:opacity-100 transition-opacity">
                  GitHub
                </span>
              </a>

              <a
                href="https://www.linkedin.com/in/santossergioluiz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="
                  group relative p-3 rounded-2xl
                  bg-slate-50 dark:bg-slate-900
                  hover:border-blue-500/30 border border-transparent
                  transition-all
                "
              >
                <Linkedin
                  size={24}
                  className="text-slate-400 group-hover:text-[#0077b5] transition-colors"
                />
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black uppercase tracking-tight opacity-0 group-hover:opacity-100 transition-opacity">
                  LinkedIn
                </span>
              </a>
            </div>
          </div>

          {/* SETTINGS */}
          <div className="flex flex-col items-center md:items-end gap-10">
            <LanguageSwitcher lang={lang} />

            <a
              href="#top"
              className="
                group flex items-center gap-3
                text-[10px] font-black uppercase tracking-[0.2em]
                text-slate-500 hover:text-blue-600
                bg-slate-50 dark:bg-slate-900
                px-6 py-3 rounded-2xl
                border border-slate-100 dark:border-slate-800
                transition-all
              "
            >
              <ArrowUp
                size={14}
                className="group-hover:-translate-y-1 transition-transform"
              />
              {dict.footer.backToTop}
            </a>
          </div>
        </div>

        {/* TECH SIGNATURE */}
        <div className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-900/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Code size={12} className="text-blue-600" />
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">
                {dict.footer.engineered}
              </p>
            </div>

            <div className="flex gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-800" />
              <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-800" />
            </div>

            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">
              Next.js • Tailwind • Vercel
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
