"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale } from "@/lib/i18n";

interface LanguageSwitcherProps {
  lang: Locale;
}

export default function LanguageSwitcher({ lang }: LanguageSwitcherProps) {
  const pathname = usePathname();

  const languages = [
    { code: "pt", label: "PT", flag: "🇧🇷" },
    { code: "en", label: "EN", flag: "🇺🇸" },
    { code: "es", label: "ES", flag: "🇪🇸" },
  ];

  /**
   * 🔄 Transforma a URL atual para o novo idioma.
   * Ex: /pt/projects -> /en/projects
   */
  const getTransformedPathname = (newLocale: string) => {
    if (!pathname) return `/${newLocale}`;
    
    const segments = pathname.split("/");
    // O primeiro segmento após a barra inicial [0] é o locale antigo ou o início da rota
    const currentLocaleInPath = languages.some(l => l.code === segments[1]);
    
    if (currentLocaleInPath) {
      segments[1] = newLocale;
    } else {
      // Caso a rota não tenha o locale (ex: rotas de fallback), injetamos no início
      segments.splice(1, 0, newLocale);
    }
    
    const newPath = segments.join("/");
    // Garante que não retorne string vazia e remove barras duplas acidentais
    return newPath === "" ? `/${newLocale}` : newPath.replace(/\/+/g, '/');
  };

  return (
    <nav aria-label="Seletor de idioma" className="bg-slate-100/50 dark:bg-slate-900/50 p-1 rounded-xl border border-slate-200/50 dark:border-slate-800/50">
      <ul className="flex items-center gap-1">
        {languages.map(({ code, label, flag }) => {
          const isActive = lang === code;

          return (
            <li key={code}>
              <Link
                href={getTransformedPathname(code)}
                scroll={false} // Evita que a página pule para o topo ao trocar o idioma
                aria-current={isActive ? "page" : undefined}
                title={label}
                className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300
                  ${isActive 
                    ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700" 
                    : "text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white/50 dark:hover:bg-slate-800/50"
                  }
                `}
              >
                <span className="grayscale-[0.5] contrast-[1.1]">{flag}</span>
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
