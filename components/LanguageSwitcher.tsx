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
    { code: "pt", label: "PT" },
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
  ] as const;

  // Lógica de transformação de URL robusta
  const getTransformedPathname = (newLocale: string) => {
    if (!pathname) return `/${newLocale}`;
    
    const segments = pathname.split("/").filter(Boolean);
    const locales: string[] = ["pt", "en", "es"];
    
    // Se o primeiro segmento for um locale, substitui. Se não, adiciona na frente.
    if (locales.includes(segments[0])) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    
    return `/${segments.join("/")}`;
  };

  return (
    <nav 
      aria-label="Language selector" 
      className="relative flex items-center gap-1 p-1 bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-inner"
    >
      <div className="flex items-center px-2 text-slate-400 dark:text-slate-500 border-r border-slate-200 dark:border-slate-800 mr-1">
        <Globe size={14} strokeWidth={2.5} className="animate-in fade-in duration-500" />
      </div>

      <ul className="flex items-center gap-1 relative z-10">
        {languages.map(({ code, label }) => {
          const isActive = lang === code;

          return (
            <li key={code}>
              <Link
                href={getTransformedPathname(code)}
                scroll={false}
                aria-current={isActive ? "page" : undefined}
                className={`
                  relative flex items-center justify-center min-w-[36px] h-8 rounded-xl text-[10px] font-black tracking-tighter transition-all duration-500 ease-out
                  ${isActive 
                    ? "text-blue-600 dark:text-blue-400" 
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                  }
                `}
              >
                {/* Background da pílula ativa */}
                {isActive && (
                  <div className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl shadow-sm ring-1 ring-slate-200/50 dark:ring-slate-700/50 animate-in zoom-in-95 duration-300 -z-10" />
                )}
                
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
