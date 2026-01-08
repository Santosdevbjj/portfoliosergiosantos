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
];

// Mapeamento dos arquivos de tradução
const dictionaries: Record<string, () => Promise<any>> = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  pt: () => import("../dictionaries/pt.json").then((module) => module.default),
};

/**
 * Função para buscar o dicionário de tradução com base no idioma (locale)
 * Exportada para ser usada em app/[lang]/page.tsx
 */
export const getDictionary = async (locale: string) => {
  // Tenta carregar o idioma solicitado, caso contrário carrega Português por padrão
  const loader = dictionaries[locale] || dictionaries.pt;
  return loader();
};
