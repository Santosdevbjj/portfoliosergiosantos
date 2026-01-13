"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale } from "@/lib/i18n";

interface LanguageSwitcherProps {
  lang: Locale;
  dict?: any; // Opcional, caso queira usar labels traduzidos no futuro
}

export default function LanguageSwitcher({ lang }: LanguageSwitcherProps) {
  const pathname = usePathname();

  const languages = [
    { code: "pt", label: "PT", flag: "🇧🇷" },
    { code: "en", label: "EN", flag: "🇺🇸" },
    { code: "es", label: "ES", flag: "🇪🇸" },
  ];

  // Função para trocar o idioma na URL mantendo a página atual
  const getTransformedPathname = (newLocale: string) => {
    if (!pathname) return `/${newLocale}`;
    const segments = pathname.split("/");
    
    // Verifica se o primeiro segmento é um dos idiomas suportados
    const currentLocaleInPath = languages.some(l => l.code === segments[1]);
    
    if (currentLocaleInPath) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    
    return segments.join("/") || "/";
  };

  return (
    <nav aria-label="Seletor de idioma">
      <ul className="flex items-center gap-2">
        {languages.map(({ code, label, flag }) => {
          // O estado ativo agora é baseado na prop 'lang' enviada pelo pai
          const isActive = lang === code;

          return (
            <li key={code}>
              <Link
                href={getTransformedPathname(code)}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all border
                  ${isActive 
                    ? "bg-blue-600 border-blue-600 text-white shadow-md scale-105" 
                    : "bg-transparent border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-400 hover:text-blue-600"
                  }`}
              >
                <span className="text-base">{flag}</span>
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
