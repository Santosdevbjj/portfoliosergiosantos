// lib/i18n.ts

/**
 * Idiomas suportados
 */
export type Locale = "pt" | "en" | "es";
export const SUPPORTED_LOCALES: Locale[] = ["pt", "en", "es"];
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
    aboutIntro: string;
    aboutDetails: string;
    experienceTitle: string;
    reskillingTitle: string;
    differentialTitle: string;
    objectiveTitle: string;
    stackConsolidated: string;
    stackUpdating: string;
    projectsTitle: string;
    articlesTitle: string;
    featuredArticle: string;
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
  };
};

/**
 * Traduções inline
 */
export const translations: Record<Locale, Translations> = {
  // ... blocos pt e en já existentes ...

  es: {
    navigation: {
      home: "Inicio",
      about: "Sobre mí",
      projects: "Proyectos",
      contact: "Contacto",
      language: "Idioma",
    },
    footer: {
      rights: "Todos los derechos reservados",
    },
    darkMode: {
      lightMode: "Modo Claro",
      darkMode: "Modo Oscuro",
    },
    sections: {
      aboutTitle: "👨‍💻 Sobre mí",
      aboutIntro:
        "Analista de Ciencia de Datos | Python | SQL | Azure Databricks | Eficiencia Operacional y Gobernanza de Datos",
      aboutDetails:
        "Bienvenido(a). Soy un profesional con más de 15 años de experiencia en sistemas bancarios de misión crítica, ahora dedicado a transformar datos en inteligencia estratégica y apoyar la toma de decisiones.\n\nUtilizo un stack moderno basado en Python, Azure Databricks, SQL y Neo4J para desarrollar soluciones de datos con rigor técnico, cumplimiento y enfoque en impacto directo en el negocio.",
      experienceTitle: "💼 Experiencia Técnica",
      reskillingTitle: "📚 Transición y Recapacitación",
      differentialTitle: "⭐ Diferencial",
      objectiveTitle: "🎯 Objetivo",
      stackConsolidated: "Stack consolidado",
      stackUpdating: "Stack en actualización",
      projectsTitle: "🛠 Proyectos Destacados",
      articlesTitle: "📝 Artículos Destacados",
      featuredArticle: "Artículo Ganador",
      contactTitle: "Contacto Directo",
    },
    featuredArticle: {
      title: "Low-Code en Salud: Cómo Crear Apps Médicas en Semanas",
      description:
        "Análisis sobre la aplicación de plataformas low-code en el sector salud, abordando beneficios, desafíos y casos prácticos para el desarrollo acelerado de aplicaciones médicas.",
      award1: "🏆 Ganador de la 35ª Competencia de Artículos DIO",
      award2: "🏆 Mejor Artículo del Mes - Septiembre 2025",
      readOn: "Puedes leer el artículo en las siguientes plataformas:",
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
        "Sistema automatizado de IPVA que eliminó 2.920 horas anuales de procesamiento manual",
      item2:
        "Infraestructura de red corporativa para más de 500 usuarios con 99,5% de disponibilidad",
      item3:
        "Sistemas jurídicos interdepartamentales con trazabilidad completa y cumplimiento de la LGPD",
      stackConsolidated:
        "Visual Basic, C, SQL Server, Windows Server, Emulación Mainframe IBM, Active Directory",
      stackUpdating:
        "Java, C#/.NET, Python, Azure Databricks, Azure AI, Power BI, Machine Learning, Docker, Neo4J (bases de datos de grafos)",
      reskilling:
        "Desde 2008 trabajo como consultor independiente mientras invierto en actualización continua mediante bootcamps y certificaciones especializadas. Recientemente completé formación en Ciencia de Datos con Python y Neo4J para análisis de datos con grafos — habilidad aplicable a detección de fraudes, análisis de relaciones y cumplimiento en entornos corporativos.\n\nFormaciones completadas: Santander Coders, Microsoft AI Agents, IBM AI Fundamentals, Azure Databricks, Azure Cloud, Java, C#/.NET, Ciberseguridad, Power BI, Ciencia de Datos",
      differential:
        "Combino profundo conocimiento de entornos regulados (cumplimiento bancario, seguridad de datos, auditoría) con capacidad técnica para modernizar infraestructura heredada y aplicar análisis avanzado de datos. Experiencia práctica en evaluar no solo viabilidad técnica, sino también riesgos, cumplimiento e impacto organizacional de cada solución.",
      objective:
        "Busco oportunidades en proyectos que involucren gobernanza de datos, modernización de infraestructura o sistemas corporativos regulados — preferentemente en formato remoto o híbrido — donde mi experiencia bancaria y stack técnico diversificado puedan generar impacto medible.",
    },
    projectCategories: {
      dataScience: "Ciencia de Datos",
      azureDatabricks: "Azure Databricks",
      neo4j: "Neo4J",
      powerBI: "Power BI y Análisis de Datos",
      database: "Bases de Datos",
      python: "Python",
      dotnet: "C#/dotnet .NET",
      java: "Java",
      machineLearning: "Machine Learning",
      aws: "Amazon AWS",
      cybersecurity: "Ciberseguridad",
      logic: "Lógica de Programación",
      html: "HTML",
      articlesRepo: "Repositorio de Artículos Técnicos",
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
