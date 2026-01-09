// hooks/useTheme.ts
"use client";
import { useEffect, useState, useCallback } from "react";

export type Theme = "light" | "dark" | "system";

/**
 * Hook customizado para controle de tema (dark mode).
 * - Segue o sistema por padrão (prefers-color-scheme).
 * - Permite override manual (light/dark) salvo em localStorage.
 * - Permite reset para voltar a seguir o sistema.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("system");
  const [isDark, setIsDark] = useState<boolean>(false);

  // Inicializa tema com base no localStorage ou sistema
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;

    if (storedTheme && storedTheme !== "system") {
      setTheme(storedTheme);
      setIsDark(storedTheme === "dark");
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      setTheme("system");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  // Escuta mudanças do sistema se o tema estiver em "system"
  useEffect(() => {
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (event: MediaQueryListEvent) => {
        setIsDark(event.matches);
        document.documentElement.classList.toggle("dark", event.matches);
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  // Alterna manualmente entre claro/escuro
  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      setIsDark(newTheme === "dark");
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      return newTheme;
    });
  }, []);

  // Define diretamente o tema
  const applyTheme = useCallback((newTheme: Theme) => {
    if (newTheme === "system") {
      localStorage.removeItem("theme");
      setTheme("system");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    } else {
      localStorage.setItem("theme", newTheme);
      setTheme(newTheme);
      setIsDark(newTheme === "dark");
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
  }, []);

  // Reseta para seguir o sistema
  const resetTheme = useCallback(() => {
    applyTheme("system");
  }, [applyTheme]);

  return {
    theme,        // "light" | "dark" | "system"
    isDark,       // boolean indicando se está em dark mode
    toggleTheme,  // alterna manualmente
    resetTheme,   // volta a seguir o sistema
    applyTheme,   // define diretamente "light" | "dark" | "system"
  };
}
