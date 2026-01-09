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
    // Sobre / About
    aboutTitle: string;
    aboutIntro: string;
    aboutDetails: string;

    // Experiência / Experience
    experienceTitle: string;
    stackConsolidated: string;
    stackUpdating: string;

    // Projetos e artigos / Projects & articles
    projectsTitle: string;
    articlesTitle: string;

    // Artigo vencedor / Featured article
    featuredArticle: string;

    // Contato / Contact
    contactTitle: string;
  };
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
  experience: {
    item1: string;
    item2: string;
    item3: string;
    stackConsolidated: string;
    stackUpdating: string;
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
      aboutIntro:
        "Seja bem-vindo(a). Sou um profissional com mais de 15 anos de experiência em sistemas de missão crítica no setor bancário, agora dedicando minha atuação a transformar dados em inteligência estratégica e suporte à tomada de decisão.",
      aboutDetails:
        "Utilizo Python, Azure Databricks, SQL e Neo4J para desenvolver soluções de dados com rigor técnico, conformidade e foco em impacto direto no negócio.",
      experienceTitle: "💼 Experiência Técnica",
      stackConsolidated: "Stack consolidado",
      stackUpdating: "Stack em atualização",
      projectsTitle: "🛠 Projetos em Destaque",
      articlesTitle: "📝 Artigos em Destaque",
      featuredArticle: "Artigo Vencedor",
      contactTitle: "Contato Direto",
    },
    featuredArticle: {
      title: "Low-Code na Saúde: Como Criar Apps Médicos em Semanas",
      description:
        "Análise sobre aplicação de plataformas low-code no setor de saúde, abordando benefícios, desafios e casos de uso práticos para desenvolvimento acelerado de aplicações médicas.",
      award1: "🏆 Vencedor da 35ª Competição de Artigos DIO",
      award2: "🏆 Melhor Artigo do Mês - Setembro 2025",
      readOn: "Você pode ler o artigo nas plataformas:",
      links: {
        dio: "https://web.dio.me/articles/low-code-na-saude-como-criar-apps-medicos-em-semanas-d77f6760fa5a?back=/articles",
        linkedin:
          "https://www.linkedin.com/pulse/low-code-na-sa%C3%BAde-como-criar-apps-m%C3%A9dicos-em-semanas-luiz-dos-santos-xen7e",
        medium:
          "https://medium.com/@sergioluiz.santos/low-code-na-sa%C3%BAde-como-criar-apps-m%C3%A9dicos-em-semanas-1c6f05c2c89e",
      },
    },
    experience: {
      item1:
        "Sistema automatizado de IPVA eliminando 2.920 horas anuais de processamento manual",
      item2:
        "Infraestrutura de rede corporativa para 500+ usuários com 99,5% de disponibilidade",
      item3:
        "Sistemas jurídicos interdepartamentais com rastreabilidade completa e conformidade LGPD",
      stackConsolidated:
        "Visual Basic, C, SQL Server, Windows Server, Emulação Mainframe IBM, Active Directory",
      stackUpdating:
        "Java, C#/.NET, Python, Azure Databricks, Azure AI, Power BI, Machine Learning, Docker, Neo4J",
    },
    projectCategories: {
      dataScience: "Ciência de Dados",
      azureDatabricks: "Azure Databricks",
      neo4j: "Neo4J",
      powerBI: "Power BI e Análise de Dados",
      database: "Banco de Dados",
      python: "Python",
      dotnet: "C#/dotnet .NET",
      java: "Java",
      machineLearning: "Machine Learning",
      aws: "Amazon AWS",
      cybersecurity: "Cibersegurança",
      logic: "Lógica de Programação",
      html: "HTML",
      articlesRepo: "Repositório de Artigos Técnicos",
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
      aboutIntro:
        "Welcome! I am a professional with over 15 years of experience in mission-critical banking systems, now dedicated to transforming data into strategic intelligence and supporting decision-making.",
      aboutDetails:
        "I use Python, Azure Databricks, SQL, and Neo4J to develop data solutions with technical rigor, compliance, and a focus on direct business impact.",
      experienceTitle: "💼 Technical Experience",
      stackConsolidated: "Consolidated Stack",
      stackUpdating: "Stack in Evolution",
      projectsTitle: "🛠 Featured Projects",
      articlesTitle: "📝 Featured Articles",
      featuredArticle: "Featured Article",
      contactTitle: "Direct Contact",
    },
    featuredArticle: {
      title: "Low-Code in Healthcare: How to Build Medical Apps in Weeks",
      description:
        "Analysis of the application of low-code platforms in the healthcare sector, addressing benefits, challenges, and practical use cases for accelerated development of medical applications.",
      award1: "🏆 Winner of the 35th DIO Article Competition",
      award2: "🏆 Best Article of the Month – September 2025",
      readOn: "You can read the article on the following platforms:",
      links: {
        dio: "https://web.dio.me/articles/low-code-na-saude-como-criar-apps-medicos-em-semanas-d77f6760fa5a?back=/articles",
        linkedin:
          "https://www.linkedin.com/pulse/low-code-na-sa%C3%BAde-como-criar-apps-m%C3%A9dicos-em-semanas-luiz-dos-santos-xen7e",
        medium:
          "https://medium.com/@sergioluiz.santos/low-code-na-sa%C3%BAde-como-criar-apps-m%C3%A9dicos-em-semanas-1c6f05c2c89e",
      },
    },
    experience: {
      item1:
        "Automated IPVA system eliminating 2,920 annual hours of manual processing",
      item2:
        "Corporate network infrastructure for 500+ users with 99.5% availability",
      item3:
        "Interdepartmental legal systems with full traceability and LGPD compliance",
      stackConsolidated:
        "Visual Basic, C, SQL Server, Windows Server, IBM Mainframe Emulation, Active Directory",
      stackUpdating:
        "Java, C#/.NET, Python, Azure Databricks, Azure AI, Power BI, Machine Learning, Docker, Neo4J",
    },
    projectCategories: {
      dataScience: "Data Science",
      azureDatabricks: "Azure Databricks",
      neo4j: "Neo4J",
      powerBI: "Power BI & Data Analysis",
      database: "Databases",
      python: "Python",
      dotnet: "C#/dotnet .NET",
      java: "Java",
      machineLearning: "Machine Learning",
      aws: "Amazon AWS",
      cybersecurity: "Cybersecurity",
      logic: "Programming Logic",
      html: "HTML",
      articlesRepo: "Technical Articles Repository",
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
