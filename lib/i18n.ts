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

const dictionaries: Record<string, () => Promise<any>> = {
  // O @ aponta para a raiz do projeto, evitando erros de "../"
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  pt: () => import("@/dictionaries/pt.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  const loader = dictionaries[locale] || dictionaries.pt;
  return loader();
};
