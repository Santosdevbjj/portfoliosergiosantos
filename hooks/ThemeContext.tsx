"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

export type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  resetTheme: () => void;
  applyTheme: (newTheme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [isDark, setIsDark] = useState<boolean>(false);

  // Função auxiliar para aplicar tema no DOM
  const applyToDOM = (dark: boolean) => {
    document.documentElement.classList.toggle("dark", dark);
  };

  // Inicializa tema com base em cookie ou localStorage
  useEffect(() => {
    const storedTheme =
      (typeof document !== "undefined"
        ? document.cookie
            .split("; ")
            .find((row) => row.startsWith("theme="))
            ?.split("=")[1]
        : null) || localStorage.getItem("theme");

    if (storedTheme && storedTheme !== "system") {
      setTheme(storedTheme as Theme);
      const dark = storedTheme === "dark";
      setIsDark(dark);
      applyToDOM(dark);
    } else {
      setTheme("system");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefersDark);
      applyToDOM(prefersDark);
    }
  }, []);

  // Escuta mudanças do sistema se o tema estiver em "system"
  useEffect(() => {
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (event: MediaQueryListEvent) => {
        setIsDark(event.matches);
        applyToDOM(event.matches);
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
      document.cookie = `theme=${newTheme}; path=/; max-age=${60 * 60 * 24 * 365}`;
      const dark = newTheme === "dark";
      setIsDark(dark);
      applyToDOM(dark);
      return newTheme;
    });
  }, []);

  // Define diretamente o tema
  const applyTheme = useCallback((newTheme: Theme) => {
    if (newTheme === "system") {
      localStorage.removeItem("theme");
      document.cookie = `theme=system; path=/; max-age=${60 * 60 * 24 * 365}`;
      setTheme("system");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefersDark);
      applyToDOM(prefersDark);
    } else {
      localStorage.setItem("theme", newTheme);
      document.cookie = `theme=${newTheme}; path=/; max-age=${60 * 60 * 24 * 365}`;
      setTheme(newTheme);
      const dark = newTheme === "dark";
      setIsDark(dark);
      applyToDOM(dark);
    }
  }, []);

  // Reseta para seguir o sistema
  const resetTheme = useCallback(() => {
    localStorage.removeItem("theme");
    document.cookie = `theme=system; path=/; max-age=${60 * 60 * 24 * 365}`;
    setTheme("system");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(prefersDark);
    applyToDOM(prefersDark);
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme, isDark, toggleTheme, resetTheme, applyTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext deve ser usado dentro de ThemeProvider");
  }
  return context;
}
