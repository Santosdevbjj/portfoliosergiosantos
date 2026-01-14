"use client";

import type { GitHubRepo } from "@/lib/github";
import { Github, Star, ExternalLink, Code2, Circle } from "lucide-react";

interface Props {
  repo: GitHubRepo;
}

export default function ProjectCard({ repo }: Props) {
  // Formata o nome do repo: remove hífens e coloca em caixa alta para um look mais "industrial"
  const displayName = repo.name.replace(/-/g, ' ').replace(/_/g, ' ');

  // Cores dinâmicas para linguagens comuns em Data Engineering
  const langColors: Record<string, string> = {
    Python: "text-blue-500",
    Scala: "text-red-500",
    Java: "text-orange-600",
    SQL: "text-purple-500",
    TypeScript: "text-blue-400",
  };

  return (
    <article
      className="group flex flex-col h-full p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/60 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(37,99,235,0.15)] hover:-translate-y-3"
    >
      <div className="flex justify-between items-start mb-8">
        <div className="p-4 rounded-[1.25rem] bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
          <Code2 size={22} />
        </div>
        
        <div className="flex gap-2">
          {/* Badge de Linguagem */}
          {repo.language && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-black uppercase tracking-tighter">
              <Circle size={8} fill="currentColor" className={langColors[repo.language] || "text-slate-400"} />
              {repo.language}
            </div>
          )}

          {/* Contador de Estrelas */}
          {repo.stargazers_count > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-[10px] font-black">
              <Star size={10} fill="currentColor" />
              {repo.stargazers_count}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter group-hover:text-blue-600 transition-colors capitalize leading-none">
          {displayName}
        </h4>
        
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 font-medium">
          {repo.description || "Data engineering architecture involving complex ETL processes, data modeling, and cloud infrastructure."}
        </p>
      </div>

      {/* Tags (Topics) com Scroll Horizontal sutil se necessário */}
      <div className="flex flex-wrap gap-2 mb-8 mt-auto">
        {(repo.topics?.length > 0 ? repo.topics.slice(0, 4) : ['Engineering', 'Data', 'Cloud']).map((topic) => (
          <span 
            key={topic} 
            className="px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.1em] bg-slate-50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-800 rounded-lg group-hover:border-blue-500/20 transition-colors"
          >
            {topic}
          </span>
        ))}
      </div>

      {/* Link de Ação Estilizado */}
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="
          group/btn inline-flex items-center justify-center gap-3 w-full px-6 py-4 
          rounded-2xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 
          text-[10px] font-black uppercase tracking-[0.2em]
          hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white
          transition-all duration-300 shadow-xl shadow-blue-500/5
        "
      >
        <Github size={16} className="group-hover/btn:rotate-12 transition-transform" />
        Repository
        <ExternalLink size={12} className="opacity-40 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
      </a>
    </article>
  );
}
