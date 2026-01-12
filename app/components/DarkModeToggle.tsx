"use client";

import { useEffect, useState } from "react";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

interface Props {
  lang: Locale;
}

type Theme = "light" | "dark";

export default function DarkModeToggle({ lang }: Props) {
  const dict = getDictionary(lang);

  const [theme, setTheme] = useState<Theme>("light");

  // Inicialização segura no client
  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;

    if (stored) {
      setTheme(stored);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  // Aplica tema no DOM e persiste
  useEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const isDark = theme === "dark";
  const label = isDark
    ? dict.theme.themeLight
    : dict.theme.themeDark;

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={label}
        aria-pressed={isDark}
        aria-live="polite"
        title={label}
        className="
          flex items-center gap-2
          px-3 sm:px-4 py-2
          rounded-md
          bg-gray-200 dark:bg-gray-700
          text-gray-900 dark:text-gray-100
          transition-colors duration-300
          text-sm sm:text-base font-medium
          hover:bg-gray-300 dark:hover:bg-gray-600
          focus:outline-none
          focus:ring-2 focus:ring-offset-2
          focus:ring-blue-500
        "
      >
        <span className="text-lg">
          {isDark ? "☀️" : "🌙"}
        </span>

        <span className="hidden sm:inline">
          {label}
        </span>
      </button>
    </div>
  );
}
