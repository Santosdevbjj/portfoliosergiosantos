import React from "react";
import { Dictionary } from "@/lib/i18n";
import { FileText, ChevronDown, Database, Trophy, ExternalLink } from "lucide-react";

type HeroSectionProps = {
  dict: Dictionary;
  lang: "pt" | "en" | "es";
};

const HeroSection: React.FC<HeroSectionProps> = ({ dict, lang }) => {
  const cvPath = `/cv-sergio-santos-${lang}.pdf`;

  return (
    <section
      role="region"
      aria-labelledby="hero-title"
      className="relative flex flex-col items-center justify-center text-center min-h-[85vh] md:min-h-[90vh] px-6 py-20 bg-white dark:bg-slate-950 overflow-hidden"
    >
      {/* Background Decorativo (Grid do Tailwind Config) */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <div className="h-full w-full bg-grid-pattern" style={{ backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 max-w-5xl w-full space-y-10">
        
        {/* Badge Dinâmico de Localização/Status */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-widest animate-fadeIn">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          Sérgio Santos • {dict.categories.database}
        </div>

        {/* TÍTULO PRINCIPAL */}
        <div className="space-y-6">
          <h1
            id="hero-title"
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.85]"
          >
            SÉRGIO <span className="text-blue-600">SANTOS.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl sm:text-2xl font-medium text-slate-500 dark:text-slate-400 tracking-tight leading-relaxed">
            {dict.portfolio.description}
          </p>
        </div>

        {/* BADGE DE ARTIGO PREMIADO (Inclusão Estratégica) */}
        <div className="animate-reveal py-4">
          <a 
            href={dict.portfolio.featured_article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col sm:flex-row items-center gap-3 p-1 pr-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors group"
          >
            <span className="bg-blue-600 text-white px-3 py-1 rounded-xl text-[10px] font-black uppercase flex items-center gap-1">
              <Trophy size={12} /> {dict.awards.dio_winner}
            </span>
            <span className="text-sm font-bold text-blue-900 dark:text-blue-300 flex items-center gap-2">
              {dict.portfolio.featured_article.title}
              <ExternalLink size={14} className="opacity-50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </span>
          </a>
        </div>

        {/* GRUPO DE BOTÕES */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
          <a
            href="#featuredProjects"
            className="group w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-2xl shadow-blue-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <Database size={18} className="mr-2 group-hover:rotate-12 transition-transform" />
            {dict.cta.browseProjects}
          </a>

          <a
            href={cvPath}
            download
            className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:border-blue-600 dark:hover:border-blue-500 transition-all hover:shadow-lg"
          >
            <FileText size={18} className="mr-2 text-blue-600" />
            {dict.cta.downloadCV}
          </a>
        </div>
      </div>

      {/* Indicador de Scroll */}
      <div className="absolute bottom-10 animate-bounce text-slate-300 dark:text-slate-700">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

export default HeroSection;
