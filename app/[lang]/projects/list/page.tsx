"use client";

import { useState } from "react";
import Link from "next/link";
import { getAllProjects, type Lang } from "@/lib/mdx";

interface PageProps {
  params: { lang: Lang };
}

export default async function ProjectsListPage({ params }: PageProps) {
  const { lang } = params;
  const projects = await getAllProjects(lang);

  // Coleta todas as tags únicas
  const allTags = Array.from(
    new Set(projects.flatMap((p) => p.metadata.tags ?? []))
  );

  return <ProjectsListClient lang={lang} projects={projects} tags={allTags} />;
}

/** Componente Client para filtros interativos */
function ProjectsListClient({
  lang,
  projects,
  tags,
}: {
  lang: Lang;
  projects: Awaited<ReturnType<typeof getAllProjects>>;
  tags: string[];
}) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredProjects = selectedTag
    ? projects.filter((p) => p.metadata.tags?.includes(selectedTag))
    : projects;

  return (
    <section className="container py-10 space-y-6">
      <h1 className="text-2xl font-bold">
        {lang === "en"
          ? "All Projects"
          : lang === "es"
          ? "Todos los Proyectos"
          : "Todos os Projetos"}
      </h1>

      {/* Filtros por tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              selectedTag === null
                ? "bg-primary text-white"
                : "bg-surface-light dark:bg-surface-dark hover:bg-primary hover:text-white"
            }`}
          >
            {lang === "en"
              ? "All"
              : lang === "es"
              ? "Todos"
              : "Todos"}
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                selectedTag === tag
                  ? "bg-primary text-white"
                  : "bg-surface-light dark:bg-surface-dark hover:bg-primary hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Lista de projetos filtrados */}
      {filteredProjects.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          {lang === "en"
            ? "No projects found for this tag."
            : lang === "es"
            ? "No se encontraron proyectos para esta etiqueta."
            : "Nenhum projeto encontrado para esta tag."}
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/${lang}/projects/${project.slug}`}
              className="block rounded-lg border border-light dark:border-dark p-4 hover:shadow-lg transition-shadow bg-surface-light dark:bg-surface-dark"
            >
              <h2 className="text-lg font-semibold mb-2">
                {project.metadata.title}
              </h2>
              {project.metadata.date && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {project.metadata.date}
                </p>
              )}
              {project.metadata.description && (
                <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-3">
                  {project.metadata.description}
                </p>
              )}
              {project.metadata.tags && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.metadata.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
