import React from "react";

// Definição de textos multilíngues
const content = {
  pt: {
    title: "Analista de Ciência de Dados",
    subtitle: "Transformando dados em decisões estratégicas e eficiência operacional.",
    button: "Ver Currículo",
    cv: "/cv-sergio-santos-pt.pdf",
  },
  en: {
    title: "Data Science Analyst",
    subtitle: "Turning data into strategic decisions and operational efficiency.",
    button: "View Resume",
    cv: "/cv-sergio-santos-en.pdf",
  },
  es: {
    title: "Analista de Ciencia de Datos",
    subtitle: "Transformando datos en decisiones estratégicas y eficiencia operativa.",
    button: "Ver Currículum",
    cv: "/cv-sergio-santos-es.pdf",
  },
};

type HeroSectionProps = {
  lang: "pt" | "en" | "es"; // idioma selecionado
};

const HeroSection: React.FC<HeroSectionProps> = ({ lang }) => {
  const { title, subtitle, button, cv } = content[lang];

  return (
    <section className="flex flex-col items-center justify-center text-center min-h-screen px-6 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
        <p className="text-lg md:text-xl mb-8">{subtitle}</p>
        <a
          href={cv}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold shadow-lg transition"
        >
          {button}
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
