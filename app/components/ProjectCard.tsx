import type { GitHubRepo } from "@/lib/github";
import type { Locale } from "@/lib/i18n";
import { Github, Star, Code2, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  repo: GitHubRepo;
  buttonLabel: string;
  descriptionFallback: string;
  ariaLabel: string;
  lang: Locale;
}

export default function ProjectCard({
  repo,
  buttonLabel,
  descriptionFallback,
  ariaLabel,
  lang,
}: ProjectCardProps) {
  // Mapeamento de idioma para acessibilidade local
  const htmlLangMap = { en: "en-US", es: "es-ES", pt: "pt-BR" };

  return (
    <article
      aria-labelledby={`repo-${repo.id}-title`}
      lang={htmlLangMap[lang]}
      className="
        group relative flex flex-col h-full
        p-6 sm:p-8
        rounded-[2rem]
        border border-slate-200 dark:border-slate-800/60
        bg-white dark:bg-slate-900/40
        shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none
        hover:shadow-[0_20px_40px_rgba(37,99,235,0.1)]
        transition-all duration-500 ease-out
        hover:-translate-y-2
        hover:border-blue-500/40
        backdrop-blur-sm
      "
    >
      {/* Glow de fundo sutil no hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] -z-10" />

      <div className="flex justify-between items-start mb-6">
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-all duration-500">
          <Github size={24} />
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-800/50 text-xs font-black text-slate-500">
          <Star size={14} className="text-amber-500 fill-amber-500" />
          {repo.stargazers_count || 0}
        </div>
      </div>

      {/* Nome do repositório: Peso extra para autoridade */}
      <h3
        id={`repo-${repo.id}-title`}
        className="
          mb-3
          text-2xl font-black tracking-tighter
          text-slate-900 dark:text-white
          group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300
        "
      >
        {repo.name}
      </h3>

      {/* Descrição: Tipografia equilibrada */}
      <p className="mb-8 text-base leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-3 flex-grow font-medium">
        {repo.description || descriptionFallback}
      </p>

      {/* Footer: Tech Stack + Call to Action */}
      <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100 dark:border-slate-800/50">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
          <Code2 size={14} className="text-blue-500" />
          {repo.language || "Engine"}
        </div>

        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className="
            flex items-center gap-2
            text-[10px] font-black uppercase tracking-[0.2em]
            text-blue-600 dark:text-blue-400
            hover:text-blue-800 dark:hover:text-blue-200
            transition-all group/link
          "
        >
          {buttonLabel}
          <ExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </article>
  );
}
