"use client";

import ProjectCard from "./ProjectCard";
import type { GitHubRepo } from "@/lib/github";
import { FolderKanban, ChevronRight } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";

interface Props {
  /** ID fixo da seção (ex: "featured-projects") */
  id: string;

  /** Título já traduzido vindo do dicionário */
  title: string;

  /** Texto auxiliar da seção (ex: "Technical Repositories") */
  subtitle: string;

  /** Lista de projetos */
  projects: GitHubRepo[];
}

export default function ProjectsSection({
  id,
  title,
  subtitle,
  projects,
}: Props) {
  // Segurança: não renderiza a seção se não houver projetos
  if (!projects || projects.length === 0) return null;

  return (
    <section
      id={id}
      role="region"
      aria-labelledby={`${id}-title`}
      className="py-16 first:pt-0"
    >
      {/* HEADER DA SEÇÃO */}
      <div className="flex items-center gap-4 mb-12 group">
        <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 group-hover:text-blue-600 group-hover:border-blue-500/30 transition-all duration-500 shadow-sm">
          <FolderKanban size={22} />
        </div>

        <div className="flex flex-col">
          <h3
            id={`${id}-title`}
            className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase flex items-center gap-3"
          >
            {title}
            <span className="px-2 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-xs font-black text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50">
              {projects.length.toString().padStart(2, "0")}
            </span>
          </h3>

          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mt-1 flex items-center gap-1">
            {subtitle}
            <ChevronRight size={10} />
          </p>
        </div>

        {/* Linha decorativa */}
        <div className="flex-1 h-px bg-gradient-to-r from-slate-200 via-slate-100 to-transparent dark:from-slate-800 dark:via-slate-900 dark:to-transparent hidden sm:block ml-4" />
      </div>

      {/* GRID DE PROJETOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((repo, index) => (
          <div
            key={repo.id}
            className="h-full animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
            style={{
              animationDelay: `${index * 150}ms`,
              animationFillMode: "both",
            }}
          >
            <ProjectCard repo={repo} />
          </div>
        ))}
      </div>
    </section>
  );
}
