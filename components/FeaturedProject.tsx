import React from "react";
import type { Dictionary } from "@/lib/i18n";
import {
  ArrowUpRight,
  BarChart3,
  ShieldCheck,
  Quote,
} from "lucide-react";

type FeaturedProjectProps = {
  dict: Dictionary;
};

export default function FeaturedProject({ dict }: FeaturedProjectProps) {
  const { featuredProject, sections } = dict;

  return (
    <section
      id="featured-project"
      role="region"
      aria-labelledby="featured-project-title"
      className="
        py-20 sm:py-24 md:py-32
        bg-slate-50 dark:bg-slate-900/40
        transition-colors duration-500
      "
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* HEADER */}
        <header className="flex flex-col mb-16 space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-2 bg-blue-600 rounded-full" />
            <h2
              id="featured-project-title"
              className="
                text-[clamp(2.5rem,5vw,3.75rem)]
                font-black
                tracking-tighter
                text-slate-900 dark:text-white
              "
            >
              {sections.featuredProjectTitle}
            </h2>
          </div>

          <p className="text-slate-500 dark:text-slate-400 font-medium text-base sm:text-lg max-w-2xl ml-6">
            {sections.featuredProjectDescription ||
              "Deep dive into a high-impact engineering solution."}
          </p>
        </header>

        {/* CONTAINER PRINCIPAL */}
        <div
          className="
            grid grid-cols-1 lg:grid-cols-2
            rounded-[3rem]
            overflow-hidden
            bg-white dark:bg-slate-900
            border border-slate-200 dark:border-slate-800
            shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)]
            dark:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)]
          "
        >
          {/* PAINEL ESQUERDO */}
          <div className="relative p-8 sm:p-10 md:p-16 bg-blue-600 text-white flex flex-col justify-between overflow-hidden">
            {/* Background decorativo */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #fff 1.5px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-br from-blue-500/50 to-transparent"
            />

            <div className="relative z-10 space-y-10">
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-xl">
                <ShieldCheck size={14} aria-hidden />
                {featuredProject.badge}
              </span>

              <h3
                className="
                  text-[clamp(3rem,6vw,4.5rem)]
                  font-black
                  leading-[1]
                  tracking-tighter
                "
              >
                {featuredProject.title}
              </h3>

              <blockquote className="relative p-6 sm:p-8 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                <Quote
                  aria-hidden
                  className="absolute -top-4 -left-2 text-blue-300 opacity-40 w-10 h-10 -rotate-12"
                />
                <p className="italic text-blue-50 text-lg sm:text-xl md:text-2xl font-medium leading-relaxed">
                  {featuredProject.highlight}
                </p>
              </blockquote>
            </div>

            <div className="relative z-10 flex flex-wrap gap-3 pt-12">
              {(featuredProject.stack ?? []).map((tech) => (
                <span
                  key={tech}
                  className="
                    px-5 py-2
                    bg-white/10 border border-white/10
                    rounded-xl
                    text-xs font-black uppercase tracking-widest
                    backdrop-blur-md
                    transition-all
                    hover:bg-white hover:text-blue-600
                  "
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* PAINEL DIREITO */}
          <div className="p-8 sm:p-10 md:p-16 flex flex-col justify-center space-y-14 bg-white dark:bg-slate-900">
            {/* PROBLEMA */}
            <div className="space-y-4">
              <span className="flex items-center gap-3 text-blue-600 dark:text-blue-400 font-black text-[10px] uppercase tracking-[0.2em]">
                <span className="h-1 w-6 bg-current rounded-full" />
                {featuredProject.challengeTitle}
              </span>

              <p className="text-slate-900 dark:text-slate-100 text-xl sm:text-2xl font-black tracking-tight">
                {featuredProject.problem}
              </p>

              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-[10px] font-bold uppercase tracking-wider">
                {featuredProject.baselineLabel}:
                <strong className="ml-1 text-slate-900 dark:text-white">
                  {featuredProject.baseline}
                </strong>
              </span>
            </div>

            {/* SOLUÇÃO */}
            <div className="space-y-4">
              <span className="flex items-center gap-3 text-blue-600 dark:text-blue-400 font-black text-[10px] uppercase tracking-[0.2em]">
                <span className="h-1 w-6 bg-current rounded-full" />
                {featuredProject.solutionTitle}
              </span>

              <p className="text-slate-500 dark:text-slate-400 font-medium text-base sm:text-lg leading-relaxed">
                {featuredProject.solution}
              </p>
            </div>

            {/* IMPACTO */}
            <div className="space-y-5">
              <span className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 font-black text-[10px] uppercase tracking-[0.2em]">
                <span className="h-1 w-6 bg-current rounded-full" />
                {featuredProject.impactTitle}
              </span>

              <div className="relative p-6 sm:p-8 bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 rounded-[2rem] overflow-hidden">
                <BarChart3
                  aria-hidden
                  className="absolute -right-4 -bottom-4 w-24 h-24 text-emerald-500/10 -rotate-12"
                />
                <p className="relative z-10 text-emerald-900 dark:text-emerald-300 font-black text-xl sm:text-2xl md:text-3xl tracking-tighter">
                  {featuredProject.result}
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6">
              <a
                href={featuredProject.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={featuredProject.ctaLabel}
                className="
                  w-full sm:w-auto
                  inline-flex items-center justify-center gap-4
                  px-10 py-5
                  rounded-2xl
                  bg-slate-950 dark:bg-white
                  text-white dark:text-slate-950
                  font-black text-xs uppercase tracking-[0.2em]
                  transition-all
                  hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white
                  hover:scale-[1.02]
                  active:scale-95
                  shadow-2xl shadow-blue-500/10
                  focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-blue-500
                "
              >
                {featuredProject.ctaLabel}
                <ArrowUpRight
                  size={20}
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
