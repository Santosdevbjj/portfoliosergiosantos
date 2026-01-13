// components/HeroSection.tsx
import React from "react";
import { Dictionary } from "@/lib/i18n";

type HeroSectionProps = {
  dict: Dictionary;
  lang: "pt" | "en" | "es"; // Adicionamos o lang como prop para mapear os arquivos
};

const HeroSection: React.FC<HeroSectionProps> = ({ dict, lang }) => {
  // Mapeamento dinâmico dos arquivos na pasta public/
  const cvPath = `/cv-sergio-santos-${lang}.pdf`;

  return (
    <section
      role="region"
      aria-labelledby="hero-title"
      className="
        flex flex-col items-center justify-center text-center
        min-h-[75vh] md:min-h-[85vh]
        px-6 py-12
        bg-white dark:bg-slate-950
        text-slate-900 dark:text-white
        transition-colors duration-300
      "
    >
      <div className="max-w-4xl w-full space-y-8">
        {/* TÍTULO COM GRADIENTE ANIMADO */}
        <h1
          id="hero-title"
          className="
            text-5xl sm:text-6xl md:text-7xl lg:text-8xl
            font-extrabold tracking-tight
            mb-4
            bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600
            bg-clip-text text-transparent
            animate-text-gradient bg-300%
          "
        >
          {dict.sections.aboutTitle}
        </h1>

        {/* SUBTÍTULO / INTRODUÇÃO */}
        <p
          className="
            text-lg sm:text-xl md:text-2xl
            max-w-2xl mx-auto
            text-slate-600 dark:text-slate-400
            leading-relaxed
          "
        >
          {dict.sections.aboutIntro}
        </p>

        {/* GRUPO DE BOTÕES (CTAs) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
          {/* BOTÃO PROJETOS (Âncora interna) */}
          <a
            href="#projects-title"
            className="
              w-full sm:w-auto
              inline-flex items-center justify-center
              px-10 py-4
              bg-blue-600 hover:bg-blue-700
              text-white font-bold text-lg
              rounded-2xl shadow-xl shadow-blue-500/20
              hover:scale-105 active:scale-95
              transition-all duration-300
            "
          >
            {dict.portfolio.buttonLabel}
          </a>

          {/* BOTÃO CV (Link dinâmico para o PDF) */}
          <a
            href={cvPath}
            target="_blank"
            rel="noopener noreferrer"
            className="
              w-full sm:w-auto
              inline-flex items-center justify-center
              px-10 py-4
              bg-white dark:bg-slate-900
              border-2 border-slate-200 dark:border-slate-800
              text-slate-900 dark:text-white
              font-bold text-lg
              rounded-2xl
              hover:bg-slate-50 dark:hover:bg-slate-800
              hover:border-blue-500 dark:hover:border-blue-500
              transition-all duration-300
            "
          >
            <span className="mr-2">📄</span>
            {dict.cv.label}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
