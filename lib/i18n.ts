// lib/i18n.ts

/* ================== CONFIGURAÇÃO DE LOCALES ================== */
export const i18n = {
  defaultLocale: "pt",
  locales: ["pt", "en", "es"],
} as const;

export type Locale = (typeof i18n.locales)[number];

/* ================= TYPES (Sincronizados com seus arquivos JSON) ================= */

export interface Dictionary {
  portfolio: {
    title: string;
    description: string;
    viewRepository: string;
    githubProjects: string;
    noDescription: string;
    featured_article: {
      title: string;
      award: string;
      link: string;
    };
  };
  categories: {
    "data-science": string;
    "azure-databricks": string;
    "neo4j": string;
    "power-bi": string;
    "database": string;
    "python": string;
    "dotnet": string;
    "java": string;
    "machine-learning": string;
    "aws": string;
    "cybersecurity": string;
    "programming-logic": string;
    "html": string;
    "articles-repo": string;
  };
  awards: {
    title: string;
    dio_winner: string;
    best_article_month: string;
    global_reach: string;
  };
  footer: {
    rights: string;
    contact: string;
    builtWith: string;
  };
  theme: {
    themeLight: string;
    themeDark: string;
    themeSystem: string;
  };
  cta: {
    hireMe: string;
    downloadCV: string;
    browseProjects: string;
  };
  sections: {
    skills: string;
    experience: string;
    featuredProjects: string;
    awards: string;
    testimonials: string;
    about: string;
    contact: string;
  };
  common: {
    loading: string;
    error: string;
    back: string;
    readMore: string;
  };
}

/* ================= LOADER LOGIC (Dynamic Imports) ================= */

// Importamos os JSONs dinamicamente para não sobrecarregar o bundle inicial
const dictionaries = {
  pt: () => import("@/dictionaries/pt.json").then((module) => module.default),
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  es: () => import("@/dictionaries/es.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  // Garante que o locale seja válido, senão usa o padrão (pt)
  const loader = dictionaries[locale] ?? dictionaries.pt;
  return (await loader()) as Dictionary;
};
