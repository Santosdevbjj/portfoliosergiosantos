/* ================== LOCALES ================== */

export const SUPPORTED_LOCALES = ["pt", "en", "es"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

/* ================= DICTIONARY ================= */

export type Dictionary = {
  /* ---------- SEO / META ---------- */
  meta: {
    title: string;
    description: string;
  };

  /* ---------- NAVIGATION ---------- */
  navigation: {
    home: string;
    about: string;
    projects: string;
    contact: string;
    language: string;
    openMenu: string;
    closeMenu: string;
  };

  /* ---------- FOOTER ---------- */
  footer: {
    rights: string;
  };

  /* ---------- THEME ---------- */
  darkMode: {
    lightMode: string;
    darkMode: string;
  };

  /* ---------- SECTIONS ---------- */
  sections: {
    aboutTitle: string;
    aboutIntro: string;
    aboutDetails: string;

    experienceTitle: string;
    reskillingTitle: string;
    differentialTitle: string;
    objectiveTitle: string;

    /* Stack labels */
    stackConsolidated: string;
    stackUpdating: string;

    projectsTitle: string;
    articlesTitle: string;
    featuredArticle: string;
    contactTitle: string;

    /* Portfolio / Grid */
    searchPlaceholder: string;
    searchLabel: string;
    filtersTitle: string;
    projectsGridTitle: string;
    noProjectsFound: string;
  };

  /* ---------- HERO / PORTFOLIO ---------- */
  portfolio: {
    title: string;
    description: string;
    buttonLabel: string;
    projects: string;
  };

  /* ---------- CV ---------- */
  cv: {
    url: string;
    label: string;
  };

  /* ---------- SOCIAL ---------- */
  socialImage: string;

  /* ---------- FEATURED ARTICLE ---------- */
  featuredArticle: {
    title: string;
    description: string;
    award1: string;
    award2: string;
    readOn: string;
    links: {
      dio: string;
      linkedin: string;
      medium: string;
    };
  };

  /* ---------- FEATURED PROJECT ---------- */
  featuredProject: {
    title: string;
    problem: string;
    baseline: string;
    solution: string;
    result: string;
  };

  /* ---------- EXPERIENCE ---------- */
  experience: {
    item1: string;
    item2: string;
    item3: string;
    reskilling: string;
    differential: string;
    objective: string;
  };

  /* ---------- PROJECT CATEGORIES ---------- */
  projectCategories: {
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
    unknown: string;
  };
};
