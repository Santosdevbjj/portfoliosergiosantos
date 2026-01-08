"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setMounted(true);

    const storedTheme = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = storedTheme ?? (prefersDark ? "dark" : "light");

    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  if (!mounted) {
    return <div className="w-10 h-10 opacity-0" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
      aria-pressed={theme === "dark"}
      title={theme === "dark" ? "Modo claro" : "Modo escuro"}
      className="
        w-10 h-10 flex items-center justify-center rounded-full
        bg-gradient-to-br from-purple-400 via-pink-500 to-indigo-500
        text-white shadow-lg
        hover:scale-110 hover:shadow-2xl transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-blue-500
      "
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
