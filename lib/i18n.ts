/* ========= LOCALES ========= */
export const SUPPORTED_LOCALES = ["pt", "en", "es"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

/* ========= DICTIONARY ========= */
export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };

  navigation: {
    home: string;
    about: string;
    projects: string;
    contact: string;
    language: string;
    openMenu: string;
    closeMenu: string;
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
    aboutIntro: string;
    aboutDetails: string;
    experienceTitle: string;
    reskillingTitle: string;
    differentialTitle: string;
    objectiveTitle: string;

    projectsTitle: string;
    articlesTitle: string;
    featuredArticle: string;
    contactTitle: string;

    searchPlaceholder: string;
    searchLabel: string;
    filtersTitle: string;
    projectsGridTitle: string;
    noProjectsFound: string;
  };

  portfolio: {
    title: string;
    description: string;
    buttonLabel: string;
    projects: string;
  };

  cv: {
    url: string;
    label: string;
  };

  socialImage: string;

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

  featuredProject: {
    title: string;
    problem: string;
    baseline: string;
    solution: string;
    result: string;
  };

  experience: {
    item1: string;
    item2: string;
    item3: string;
    reskilling: string;
    differential: string;
    objective: string;
  };

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
