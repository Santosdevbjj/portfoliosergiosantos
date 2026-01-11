"use client";

import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { getDictionary, DEFAULT_LOCALE, Locale } from "@/lib/i18n";
import type { GitHubRepo } from "@/lib/github";

interface Props {
  locale?: Locale;
  projects: GitHubRepo[]; // lista de projetos recebida (pode vir da API ou mock)
}

export default function ProjectsSection({ locale = DEFAULT_LOCALE, projects }: Props) {
  const dict = getDictionary(locale);

  // Exibir apenas os 3 primeiros projetos como destaque
  const featuredProjects = projects.slice(0, 3);

  return (
    <section
      id="projects"
      role="region"
      aria-labelledby="projects-title"
      lang={locale === "en" ? "en-US" : locale === "es" ? "es-ES" : "pt-BR"}
      className="container mx-auto max-w-6xl px-4 lg:px-8 py-10 sm:py-16 space-y-8"
    >
      {/* Título */}
      <h2
        id="projects-title"
        className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 text-center"
      >
        {dict.sections.projectsTitle}
      </h2>

      {/* Grid de projetos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProjects.map((repo) => (
          <ProjectCard key={repo.id} repo={repo} dict={dict} lang={locale} />
        ))}
      </div>

      {/* Botão "Ver todos" */}
      <div className="text-center">
        <Link
          href={`/${locale}/projects/list`}
          className="inline-block px-6 py-2 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {locale === "en"
            ? "View all projects →"
            : locale === "es"
            ? "Ver todos los proyectos →"
            : "Ver todos os projetos →"}
        </Link>
      </div>
    </section>
  );
}
