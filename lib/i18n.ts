// lib/i18n.ts

/**
 * Ordem fixa das tecnologias para renderização das seções do portfólio
 * Tipada como literal para garantir consistência
 */
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
 * Agora as categorias são tipadas com base em TECHNOLOGY_ORDER
 */
export type Dictionary = {
  portfolio: {
    title: string;
    description: string;
  };
  categories: Record<(typeof TECHNOLOGY_ORDER)[number], string>;
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
 * - Se o locale não for suportado, cai para 'pt'
 * - Loga um aviso para facilitar debug
 */
export async function getDictionary(locale: string): Promise<Dictionary> {
  const supportedLocales: Locale[] = ["pt", "en"];
  const safeLocale: Locale = supportedLocales.includes(locale as Locale)
    ? (locale as Locale)
    : "pt";

  if (!supportedLocales.includes(locale as Locale)) {
    console.warn(
      `Idioma não suportado: "${locale}". Usando fallback para 'pt'.`
    );
  }

  return dictionaries[safeLocale]();
}
