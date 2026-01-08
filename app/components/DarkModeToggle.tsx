"use client";
import { useEffect, useState } from "react";
import { translations } from "@/lib/i18n";

interface Props {
  lang: "pt" | "en";
}

export default function DarkModeToggle({ lang }: Props) {
  const [dark, setDark] = useState(false);

  // Inicializa tema com base no localStorage
  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  // Alterna tema
  const toggle = () => {
    setDark((prev) => {
      const newValue = !prev;
      document.documentElement.classList.toggle("dark", newValue);
      localStorage.setItem("theme", newValue ? "dark" : "light");
      return newValue;
    });
  };

  return (
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
      aria-label={dark ? translations[lang].lightMode : translations[lang].darkMode}
      title={dark ? translations[lang].lightMode : translations[lang].darkMode}
    >
      {/* Ícone sempre visível */}
      <span className="text-base sm:text-lg md:text-xl mr-2">
        {dark ? "☀️" : "🌙"}
      </span>

      {/* Texto visível apenas em telas médias ou maiores */}
      <span className="hidden sm:inline">
        {dark ? translations[lang].lightMode : translations[lang].darkMode}
      </span>
    </button>
  );
}
