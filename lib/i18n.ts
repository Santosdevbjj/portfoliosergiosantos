// lib/i18n.ts

/**
 * Idiomas suportados
 */
export type Locale = "pt" | "en";
export const SUPPORTED_LOCALES: Locale[] = ["pt", "en"];
export const DEFAULT_LOCALE: Locale = "pt";

/**
 * Tipagem das traduções
 */
export type Translations = {
  navigation: {
    home: string;
    about: string;
    projects: string;
    contact: string;
    language: string;
  };
  footer: {
    rights: string;
  };
  darkMode: {
    lightMode: string;
    darkMode: string;
  };
  sections: {
    aboutTitle: string;
    experienceTitle: string;
    reskillingTitle: string;
    differentialTitle: string;
    objectiveTitle: string;
    projectsTitle: string;
    articlesTitle: string;
    stackConsolidated: string;
    stackUpdating: string;
  };
};

/**
 * Traduções inline
 */
export const translations: Record<Locale, Translations> = {
  pt: {
    navigation: {
      home: "Início",
      about: "Sobre",
      projects: "Projetos",
      contact: "Contato",
      language: "Idioma",
    },
    footer: {
      rights: "Todos os direitos reservados",
    },
    darkMode: {
      lightMode: "Modo Claro",
      darkMode: "Modo Escuro",
    },
    sections: {
      aboutTitle: "👨‍💻 Sobre mim",
      experienceTitle: "💼 Experiência Técnica",
      reskillingTitle: "📚 Transição e Reskilling",
      differentialTitle: "⭐ Diferencial",
      objectiveTitle: "🎯 Objetivo",
      projectsTitle: "🛠 Projetos em Destaque",
      articlesTitle: "📝 Artigos em Destaque",
      stackConsolidated: "Stack consolidado",
      stackUpdating: "Stack em atualização",
    },
  },
  en: {
    navigation: {
      home: "Home",
      about: "About",
      projects: "Projects",
      contact: "Contact",
      language: "Language",
    },
    footer: {
      rights: "All rights reserved",
    },
    darkMode: {
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
    },
    sections: {
      aboutTitle: "👨‍💻 About Me",
      experienceTitle: "💼 Technical Experience",
      reskillingTitle: "📚 Transition & Reskilling",
      differentialTitle: "⭐ Differential",
      objectiveTitle: "🎯 Objective",
      projectsTitle: "🛠 Featured Projects",
      articlesTitle: "📝 Featured Articles",
      stackConsolidated: "Consolidated Stack",
      stackUpdating: "Stack in Evolution",
    },
  },
};

/**
 * Helper para obter traduções com fallback seguro
 */
export function getTranslation(locale: string): Translations {
  const safeLocale: Locale = SUPPORTED_LOCALES.includes(locale as Locale)
    ? (locale as Locale)
    : DEFAULT_LOCALE;

  if (!SUPPORTED_LOCALES.includes(locale as Locale)) {
    console.warn(
      `[i18n] Locale "${locale}" não suportado. Usando fallback "${DEFAULT_LOCALE}".`
    );
  }

  return translations[safeLocale];
}
