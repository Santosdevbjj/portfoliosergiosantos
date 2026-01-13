"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import type { Translations } from "@/lib/i18n";

interface Props {
  // Passamos apenas a parte necessária do dicionário para manter o componente leve
  dict: Translations["theme"];
}

export default function DarkModeToggle({ dict }: Props) {
  // Consumimos o estado global que já lida com Cookies, LocalStorage e DOM
  const { isDark, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Essencial para evitar erros de hidratação no Next.js 15
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Retornamos um esqueleto ou espaço vazio para evitar que o layout "pule"
    return <div className="w-10 h-10 sm:w-32 p-2" />;
  }

  const label = isDark ? dict.themeLight : dict.themeDark;

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={label}
        title={label}
        className="
          group flex items-center gap-2
          px-3 sm:px-4 py-2
          rounded-lg
          bg-slate-100 dark:bg-slate-800
          text-slate-900 dark:text-slate-100
          border border-slate-200 dark:border-slate-700
          transition-all duration-300
          text-sm font-semibold
          hover:border-blue-500 dark:hover:border-blue-400
          focus:outline-none focus:ring-2 focus:ring-blue-500/50
        "
      >
        {/* Ícone com transição de escala para um toque mais profissional */}
        <span className="text-lg transition-transform group-hover:scale-110">
          {isDark ? "☀️" : "🌙"}
        </span>

        {/* Label visível apenas em telas maiores para economizar espaço na Navbar */}
        <span className="hidden md:inline whitespace-nowrap">
          {label}
        </span>
      </button>
    </div>
  );
}
