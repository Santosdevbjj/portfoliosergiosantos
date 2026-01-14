"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale } from "@/lib/i18n";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  lang: Locale;
}

export default function LanguageSwitcher({ lang }: LanguageSwitcherProps) {
  const pathname = usePathname();

  const languages = [
    { code: "pt", label: "PT", flag: "BR" },
    { code: "en", label: "EN", flag: "US" },
    { code: "es", label: "ES", flag: "ES" },
  ];

  const getTransformedPathname = (newLocale: string) => {
    if (!pathname) return `/${newLocale}`;
    
    const segments = pathname.split("/");
    // Verifica se o primeiro segmento é um locale válido
    const hasLocale = ["pt", "en", "es"].includes(segments[1]);
    
    if (hasLocale) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    
    return segments.join("/").replace(/\/+/g, '/') || `/${newLocale}`;
  };

  return (
    <nav 
      aria-label="Language selector" 
      className="inline-flex items-center gap-2 p-1 bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
    >
      <div className="pl-2 text-slate-400 dark:text-slate-500">
        <Globe size={14} strokeWidth={2.5} />
      </div>

      <ul className="flex items-center gap-1">
        {languages.map(({ code, label }) => {
          const isActive = lang === code;

          return (
            <li key={code}>
              <Link
                href={getTransformedPathname(code)}
                scroll={false}
                aria-current={isActive ? "page" : undefined}
                className={`
                  relative px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest transition-all duration-300
                  ${isActive 
                    ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm ring-1 ring-slate-200/50 dark:ring-slate-700/50" 
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                  }
                `}
              >
                {label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
