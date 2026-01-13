"use client";

import ProjectCard from "./ProjectCard";
import type { GitHubRepo } from "@/lib/github";

interface Props {
  title: string;
  projects: GitHubRepo[];
}

/**
 * Componente que renderiza uma seção de projetos agrupados por categoria.
 * O nome da função agora é ProjectsSection (com S) para combinar com o nome do arquivo.
 */
export default function ProjectsSection({ title, projects }: Props) {
  // Se não houver projetos nesta categoria, não renderiza nada para não sujar o layout
  if (!projects || projects.length === 0) return null;

  // Gera um ID amigável para acessibilidade baseado no título (Ex: "Data Science" -> "section-data-science")
  const sectionId = `section-${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <section
      className="space-y-6 mb-12"
      aria-labelledby={sectionId}
    >
      {/* TÍTULO DA CATEGORIA COM ESTILO VISUAL (BORDA AZUL À ESQUERDA) */}
      <h3
        id={sectionId}
        className="text-2xl font-semibold text-slate-800 dark:text-slate-200 border-l-4 border-blue-600 pl-4"
      >
        {title}
      </h3>

      {/* GRID RESPONSIVO: 1 coluna no celular, 2 no tablet, 3 no desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((repo) => (
          <ProjectCard
            key={repo.id}
            repo={repo}
          />
        ))}
      </div>
    </section>
  );
}
