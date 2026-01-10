"use client";
import { useEffect, useState } from "react";
import { translations } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

interface Props {
  lang: Locale;
}

export default function DarkModeToggle({ lang }: Props) {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme === "dark") return true;
      if (storedTheme === "light") return false;
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    // Aplica a classe "dark" sempre que o estado mudar
    document.documentElement.classList.toggle("dark", dark);

    // Observa mudanças na preferência do sistema
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) => {
      const newDark = event.matches;
      setDark(newDark);
      document.documentElement.classList.toggle("dark", newDark);
      localStorage.setItem("theme", newDark ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [dark]);

  const toggle = () => {
    setDark((prev) => {
      const newValue = !prev;
      document.documentElement.classList.toggle("dark", newValue);
      localStorage.setItem("theme", newValue ? "dark" : "light");
      return newValue;
    });
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={toggle}
        className="
          flex items-center justify-center
          px-2 sm:px-4 py-2 rounded-md
          bg-gray-200 dark:bg-gray-700
          text-gray-900 dark:text-gray-100
          transition-colors duration-300
          text-sm sm:text-base font-medium
          hover:bg-gray-300 dark:hover:bg-gray-600
        "
        aria-label={
          dark
            ? translations[lang].theme.themeLight
            : translations[lang].theme.themeDark
        }
        title={
          dark
            ? translations[lang].theme.themeLight
            : translations[lang].theme.themeDark
        }
        aria-pressed={dark}
      >
        <span className="text-base sm:text-lg md:text-xl mr-2">
          {dark ? "☀️" : "🌙"}
        </span>
        <span className="hidden sm:inline">
          {dark
            ? translations[lang].theme.themeLight
            : translations[lang].theme.themeDark}
        </span>
      </button>
    </div>
  );
}
