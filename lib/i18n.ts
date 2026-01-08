// lib/i18n.ts

export const TECHNOLOGY_ORDER = [
  "ciencia-de-dados",
  "azure-databricks",
  "neo4j",
  "power-bi",
  "banco-de-dados",
  "python",
  "dotnet",
  "java",
  "machine-learning",
  "aws",
  "ciberseguranca",
  "logica-de-programacao",
  "html",
  "artigos-tecnicos",
] as const;

/**
 * Tipagem do dicionário de tradução
 * Garante segurança de acesso no page.tsx
 */
export type Dictionary = {
  portfolio: {
    title: string;
    description: string;
  };
  categories: Record<string, string>;
};

/**
 * Idiomas suportados
 */
export type Locale = "pt" | "en";

/**
 * Loaders de dicionário por idioma
 */
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: async () =>
    (await import("@/dictionaries/en.json")).default as Dictionary,

  pt: async () =>
    (await import("@/dictionaries/pt.json")).default as Dictionary,
};

/**
 * Retorna o dicionário correto com fallback seguro
 */
export async function getDictionary(locale: string): Promise<Dictionary> {
  const safeLocale: Locale = locale === "en" ? "en" : "pt";
  return dictionaries[safeLocale]();
}
