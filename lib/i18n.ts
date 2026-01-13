// lib/i18n.ts

import { pt } from "./locales/pt";
import { en } from "./locales/en";
import { es } from "./locales/es";

/* ================== CONFIGURAÇÃO DE LOCALES ================== */
export const i18n = {
  defaultLocale: "pt",
  locales: ["pt", "en", "es"],
} as const;

export type Locale = (typeof i18n.locales)[number];

/* ================= TYPES (A estrutura que guia seu conteúdo) ================= */

// Interface estrita para garantir consistência entre as 14 categorias de projetos
export interface ProjectCategories {
  dataScience: string;
  azureDatabricks: string;
  neo4j: string;
  powerBI: string;
  database: string;
  python: string;
  dotnet: string;
  java: string;
  machineLearning: string;
  aws: string;
  cybersecurity: string;
  logic: string;
  html: string;
  articlesRepo: string;
}

export type Dictionary = {
  meta: { title: string; description: string };
  navigation: { 
    home: string; about: string; projects: string; 
    contact: string; language: string; openMenu: string; closeMenu: string; 
  };
  footer: { rights: string };
  darkMode: { lightMode: string; darkMode: string };
  sections: {
    aboutTitle: string; aboutIntro: string; aboutDetails: string;
    experienceTitle: string; reskillingTitle: string; differentialTitle: string;
    objectiveTitle: string; stackConsolidated: string; stackUpdating: string;
    projectsTitle: string; articlesTitle: string; featuredArticle: string;
    contactTitle: string; searchPlaceholder: string; searchLabel: string;
    filtersTitle: string; projectsGridTitle: string; noProjectsFound: string;
    projectsEmpty?: string;
    featuredProjectTitle: string;
  };
  featuredArticle: {
    title: string; description: string; award1: string; award2: string; readOn: string;
    links: { dio: string; linkedin: string; medium: string };
  };
  // Destaque para sua experiência bancária e técnica
  experience: {
    item1: string; item2: string; item3: string;
    reskilling: string; differential: string; objective: string;
    stackConsolidated: string; stackUpdating: string;
  };
  projectCategories: ProjectCategories & { unknown: string };
};

/* ================= LOADER LOGIC ================= */

const dictionaries: Record<Locale, Dictionary> = { pt, en, es };

/**
 * Obtém o dicionário de forma síncrona.
 * Usado em componentes de servidor e cliente para acesso instantâneo.
 */
export const getDictionary = (locale: Locale): Dictionary => {
  return dictionaries[locale] ?? dictionaries.pt;
};
