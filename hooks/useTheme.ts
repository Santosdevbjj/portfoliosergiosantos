"use client";
import { useThemeContext } from "./ThemeContext";

/**
 * Hook customizado para facilitar o acesso ao ThemeContext.
 * Centraliza a lógica para que todos os componentes compartilhem o mesmo estado.
 */
export function useTheme() {
  const context = useThemeContext();

  return {
    theme: context.theme,       // "light" | "dark" | "system"
    isDark: context.isDark,     // boolean (calculado considerando o sistema)
    toggleTheme: context.toggleTheme,
    resetTheme: context.resetTheme,
    applyTheme: context.applyTheme,
  };
}
