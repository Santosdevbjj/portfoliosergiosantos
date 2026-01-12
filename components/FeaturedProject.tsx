"use client";

import React from "react";
import { Translations } from "@/lib/i18n";

type FeaturedProjectProps = {
  dict: Translations;
};

const FeaturedProject: React.FC<FeaturedProjectProps> = ({ dict }) => {
  const { featuredProject } = dict;

  return (
    <section id="projects" className="py-20 bg-slate-50 dark:bg-slate-900/50 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-900 dark:text-white border-l-4 border-blue-600 pl-4">
          {dict.sections.projectsTitle}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
          
          {/* Lado Esquerdo: Visual/Destaque */}
          <div className="p-8 lg:p-12 bg-blue-600 text-white flex flex-col justify-center space-y-6">
            <span className="px-3 py-1 bg-blue-400/30 rounded-full text-sm font-semibold w-fit uppercase tracking-wider">
              Case de Sucesso
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold leading-tight">
              {featuredProject.title}
            </h3>
            <p className="text-blue-100 text-lg italic">
              "Redução de custos operacionais através de Inteligência Preditiva aplicada à Engenharia Civil."
            </p>
            <div className="flex flex-wrap gap-2 pt-4">
              {["Python", "Random Forest", "Streamlit", "SQL"].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-white/20 rounded-md text-sm font-medium backdrop-blur-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Lado Direito: A Jornada (Storytelling) */}
          <div className="p-8 lg:p-12 space-y-8">
            <div className="space-y-2">
              <h4 className="text-blue-600 dark:text-blue-400 font-bold uppercase text-sm tracking-widest">01. O Desafio</h4>
              <p className="text-slate-700 dark:text-slate-300 text-lg">
                <strong>{dict.featuredProject.problem}</strong>
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Baseline: {dict.featuredProject.baseline}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-blue-600 dark:text-blue-400 font-bold uppercase text-sm tracking-widest">02. A Solução</h4>
              <p className="text-slate-700 dark:text-slate-300">
                {dict.featuredProject.solution}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-green-600 dark:text-green-400 font-bold uppercase text-sm tracking-widest">03. Impacto de Negócio</h4>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r-lg">
                <p className="text-green-800 dark:text-green-200 font-semibold text-lg">
                  {dict.featuredProject.result}
                </p>
              </div>
            </div>

            <div className="pt-6">
              <a 
                href="https://portfoliosergiosantos.vercel.app/" 
                target="_blank"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:underline"
              >
                Explorar Documentação Técnica 
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProject;
