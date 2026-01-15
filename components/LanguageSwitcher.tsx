"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  lang: Locale;
}

const LANGUAGES: { code: Locale; label: string; aria: string }[] = [
  { code: "pt", label: "PT", aria: "Mudar idioma para Português" },
  { code: "en", label: "EN", aria: "Change language to English" },
  { code: "es", label: "ES", aria: "Cambiar idioma a Español" },
];

export default function LanguageSwitcher({ lang }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  // Preserva âncoras (#section) ao trocar idioma
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHash(window.location.hash || "");
    }
  }, []);

  const getTransformedPathname = (newLocale: Locale) => {
    if (!pathname) return `/${newLocale}${hash}`;

    const segments = pathname.split("/").filter(Boolean);
    const locales: Locale[] = ["pt", "en", "es"];

    if (locales.includes(segments[0] as Locale)) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }

    return `/${segments.join("/")}${hash}`;
  };

  return (
    <nav
      aria-label="Language selector"
      role="tablist"
      className="
        relative flex items-center gap-1 p-1
        rounded-2xl border
        bg-slate-100/60 dark:bg-slate-900/60
        border-slate-200/60 dark:border-slate-800/60
        backdrop-blur-xl shadow-inner
      "
    >
      {/* Ícone */}
      <div
        className="
          flex items-center px-2 mr-1
          text-slate-400 dark:text-slate-500
          border-r border-slate-200 dark:border-slate-800
        "
        aria-hidden="true"
      >
        <Globe size={14} strokeWidth={2.5} />
      </div>

      {/* Idiomas */}
      <ul className="flex items-center gap-1">
        {LANGUAGES.map(({ code, label, aria }) => {
          const isActive = lang === code;

          return (
            <li key={code} role="presentation">
              <Link
                href={getTransformedPathname(code)}
                scroll={false}
                role="tab"
                aria-label={aria}
                aria-current={isActive ? "true" : undefined}
                aria-pressed={isActive}
                className={`
                  relative flex items-center justify-center
                  min-w-[44px] h-9
                  rounded-xl text-[10px]
                  font-black tracking-tight
                  transition-all duration-300
                  focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-blue-500
                  ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                  }
                `}
              >
                {/* Fundo ativo */}
                {isActive && (
                  <span
                    className="
                      absolute inset-0 -z-10
                      rounded-xl bg-white dark:bg-slate-800
                      ring-1 ring-slate-200/50 dark:ring-slate-700/50
                      shadow-sm
                      animate-in zoom-in-95 duration-200
                    "
                  />
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
