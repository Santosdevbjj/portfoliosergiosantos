"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

interface LanguageSwitcherProps {
  lang: Locale;
  dict: { language: string };
}

export default function LanguageSwitcher({ lang, dict }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = (newLang: Locale) => {
    setOpen(false);
    if (!pathname) return;

    // 🍪 Persistência da preferência para o Middleware
    document.cookie = `locale=${newLang};path=/;max-age=31536000;SameSite=Lax`;

    const segments = pathname.split("/").filter(Boolean);

    // Lógica robusta para troca de locale no path
    if (languages.some((l) => l.code === segments[0])) {
      segments[0] = newLang;
    } else {
      segments.unshift(newLang);
    }

    // Mantém os parâmetros de busca (?projeto=analise) ao trocar o idioma
    const queryString = searchParams.toString();
    const newPath = `/${segments.join("/")}${queryString ? `?${queryString}` : ""}`;

    router.push(newPath);
  };

  // Fechar o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLanguage = languages.find((l) => l.code === lang) || languages[0];

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex items-center gap-2 px-3 py-2 
          rounded-lg border border-slate-200 dark:border-slate-800
          bg-white dark:bg-slate-900 
          text-sm font-semibold text-slate-700 dark:text-slate-200
          hover:border-blue-500 dark:hover:border-blue-400
          transition-all duration-200 shadow-sm
        "
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={dict.language}
      >
        <span className="text-base leading-none">{currentLanguage.flag}</span>
        <span className="hidden md:inline">{currentLanguage.label}</span>
        <svg 
          className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.08z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <div className="
          absolute right-0 z-[110] mt-2 w-44
          rounded-xl border border-slate-200 dark:border-slate-800
          bg-white/95 dark:bg-slate-900/95 backdrop-blur-md
          shadow-xl ring-1 ring-black/5
          animate-in fade-in zoom-in-95 duration-150
        ">
          <ul className="p-1.5" role="menu">
            {languages.map((option) => (
              <li key={option.code} role="none">
                <button
                  role="menuitem"
                  onClick={() => handleChange(option.code)}
                  className={`
                    flex w-full items-center gap-3 px-3 py-2.5 text-sm rounded-lg font-medium
                    transition-colors
                    ${lang === option.code 
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400" 
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
                    }
                  `}
                >
                  <span className="text-base">{option.flag}</span>
                  <span className="flex-1 text-left">{option.label}</span>
                  {lang === option.code && (
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
