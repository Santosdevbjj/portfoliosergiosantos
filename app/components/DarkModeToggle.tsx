"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import type { Translations } from "@/lib/i18n";

interface Props {
  // Recebe apenas o objeto 'theme' do dicionário principal
  dict: Translations["theme"];
}

export default function DarkModeToggle({ dict }: Props) {
  const { isDark, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Garante que o componente só renderize no cliente após a hidratação
  useEffect(() => {
    setMounted(true);
  }, []);

  // Placeholder para evitar Layout Shift (salto visual) enquanto o JS carrega
  if (!mounted) {
    return (
      <div className="w-10 h-10 sm:w-[120px] bg-slate-100/50 dark:bg-slate-800/50 animate-pulse rounded-lg p-2" />
    );
  }

  const label = isDark ? (dict?.themeLight || "Light") : (dict?.themeDark || "Dark");

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
          rounded-xl
          bg-slate-50/50 dark:bg-slate-900/50
          backdrop-blur-sm
          text-slate-900 dark:text-slate-100
          border border-slate-200/60 dark:border-slate-800/60
          hover:border-blue-500/50 dark:hover:border-blue-400/50
          hover:bg-white dark:hover:bg-slate-800
          transition-all duration-300
          text-sm font-bold
          focus:outline-none focus:ring-2 focus:ring-blue-500/40
        "
      >
        <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
          {/* Transição suave entre ícones */}
          <span className={`absolute transition-all duration-500 ${isDark ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            ☀️
          </span>
          <span className={`absolute transition-all duration-500 ${!isDark ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}>
            🌙
          </span>
        </div>

        {/* Label inteligente: some no celular, aparece no tablet/desktop */}
        <span className="hidden sm:inline-block whitespace-nowrap">
          {label}
        </span>
      </button>
    </div>
  );
}
