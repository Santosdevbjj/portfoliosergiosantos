"use client";

import { useEffect, useState, useMemo } from "react";
import {
  getPortfolioRepos,
  CATEGORIES_ORDER,
  type GitHubRepo,
  type CategoryKey,
} from "@/lib/github";
import { getDictionary, type Locale } from "@/lib/i18n";
import { Folder, Star, Code2, ExternalLink, Search, LayoutGrid } from "lucide-react";

interface PortfolioGridProps {
  lang: Locale;
}

export default function PortfolioGrid({ lang }: PortfolioGridProps) {
  const dict = useMemo(() => getDictionary(lang), [lang]);

  const [reposByCategory, setReposByCategory] = useState<Record<CategoryKey, GitHubRepo[]>>({} as any);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>(CATEGORIES_ORDER[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchRepos() {
      try {
        setLoading(true);
        const data = await getPortfolioRepos();
        if (isMounted) setReposByCategory(data);
      } catch (error) {
        console.error("GitHub API Fetch Error:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    
    fetchRepos();
    return () => { isMounted = false; };
  }, []);

  return (
    <section 
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" 
      aria-labelledby="portfolio-title"
    >
      {/* Header da Seção com Design Refinado */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
          <LayoutGrid size={12} />
          {lang === 'pt' ? 'Portfólio' : lang === 'es' ? 'Portafolio' : 'Portfolio'}
        </div>
        <h2 id="portfolio-title" className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
          {dict.sections.projectsTitle}
        </h2>
        <div className="mt-4 h-1.5 w-20 bg-blue-600 rounded-full" />
        <p className="text-slate-500 dark:text-slate-400 mt-6 max-w-2xl text-lg font-medium leading-relaxed">
          {dict.sections.projectsGridTitle}
        </p>
      </div>

      {/* Navegação por Categorias (Pills) */}
      <div className="relative mb-16">
        <div className="flex flex-nowrap md:flex-wrap gap-3 overflow-x-auto pb-6 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 justify-start md:justify-center">
          {CATEGORIES_ORDER.map((category) => {
            const label = dict.projectCategories[category] || category;
            const isActive = activeCategory === category;
            const count = reposByCategory[category]?.length || 0;

            if (!loading && count === 0) return null;

            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  whitespace-nowrap px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-500
                  ${isActive 
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20 scale-105" 
                    : "bg-white dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50"}
                `}
              >
                {label}
                {!loading && (
                  <span className={`ml-3 px-2 py-0.5 rounded-lg text-[10px] ${isActive ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400"}`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid de Projetos com Animação de Entrada */}
      <div className="min-h-[450px]">
        {loading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-10 space-y-6">
                <div className="h-12 w-12 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
                <div className="space-y-3">
                  <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded-xl w-3/4" />
                  <div className="h-20 bg-slate-100 dark:bg-slate-800 rounded-2xl w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : reposByCategory[activeCategory]?.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {reposByCategory[activeCategory].map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group relative flex flex-col justify-between p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800/50 
                  bg-white dark:bg-slate-900/30 hover:border-blue-500 transition-all duration-500 
                  hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] 
                  hover:-translate-y-3
                "
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl group-hover:bg-blue-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <Folder className="text-blue-600 dark:text-blue-400 group-hover:text-white w-7 h-7" />
                    </div>
                    <div className="p-2 rounded-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
                      <ExternalLink className="text-slate-300 group-hover:text-blue-500 w-5 h-5 transition-all" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {repo.name}
                  </h3>
                  <p className="text-base text-slate-500 dark:text-slate-400 mb-10 line-clamp-3 leading-relaxed font-medium">
                    {repo.description || dict.sections.projectsEmpty}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-slate-100 dark:border-slate-800/50 relative z-10">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                    <Code2 size={14} className="text-blue-500" />
                    {repo.language || "System"}
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-300">
                    <Star size={16} className="text-amber-500 fill-amber-500" />
                    {repo.stargazers_count}
                  </div>
                </div>
                
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem] text-center px-6 bg-slate-50/50 dark:bg-slate-900/20">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-xl mb-8">
              <Search className="w-16 h-16 text-blue-500/20" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tighter uppercase">{dict.sections.noProjectsFound}</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm font-medium">{dict.sections.searchLabel}</p>
          </div>
        )}
      </div>
    </section>
  );
}
