"use client";

import type { GitHubRepo } from "@/lib/github";
import type { Locale, Translations } from "@/lib/i18n";

interface Props {
  repo: GitHubRepo;
  dict: Translations;
  lang: Locale;
}

export default function ProjectCard({ repo, dict, lang }: Props) {
  const localeLang =
    lang === "en" ? "en-US" : lang === "es" ? "es-ES" : "pt-BR";

  return (
    <article
      role="article"
      aria-labelledby={`repo-${repo.id}-title`}
      lang={localeLang}
      className="w-full p-4 sm:p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
    >
      {/* Nome do repositório */}
      <h3
        id={`repo-${repo.id}-title`}
        className="font-bold text-[clamp(1rem,2vw+0.5rem,1.25rem)] text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-2"
      >
        {repo.name}
      </h3>

      {/* Descrição */}
      <p className="text-[clamp(0.875rem,2vw,1rem)] text-gray-600 dark:text-gray-300 mb-4">
        {repo.description || dict.projects.descriptionFallback}
      </p>

      {/* CTA */}
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${dict.projects.viewProjectAria} ${repo.name}`}
        className="inline-block px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.5rem,1.5vw,0.75rem)] rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
      >
        {dict.projects.viewProjectLabel}
      </a>
    </article>
  );
}
