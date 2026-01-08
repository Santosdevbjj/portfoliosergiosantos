import { GitHubRepo } from "@/lib/github";

interface ProjectCardProps {
  repo: GitHubRepo;
}

export default function ProjectCard({ repo }: ProjectCardProps) {
  return (
    <article
      className="border rounded-lg p-4 transition hover:shadow-md bg-white dark:bg-gray-800"
      role="region"
      aria-labelledby={`repo-${repo.id}`}
    >
      <h3
        id={`repo-${repo.id}`}
        className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100"
      >
        {repo.name}
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {repo.description ?? "Descrição não disponível."}
      </p>

      {repo.html_url ? (
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-blue-600 hover:underline font-medium"
          aria-label={`Abrir repositório ${repo.name} no GitHub`}
        >
          Ver projeto →
        </a>
      ) : (
        <span className="text-gray-400 italic text-sm">Link não disponível</span>
      )}
    </article>
  );
}
