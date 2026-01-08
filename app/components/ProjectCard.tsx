import { GitHubRepo } from "@/lib/github";

interface ProjectCardProps {
  repo: GitHubRepo;
}

export default function ProjectCard({ repo }: ProjectCardProps) {
  return (
    <article className="border rounded-2xl p-6 transition-shadow duration-300 hover:shadow-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 hover:scale-105">
      <h3 className="text-lg sm:text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-accent to-secondary-light animate-textGradient">
        {repo.name}
      </h3>

      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
        {repo.description || "Descrição não disponível."}
      </p>

      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block font-medium text-white bg-gradient-to-r from-primary-light to-primary-dark px-4 py-2 rounded-lg hover:from-secondary-light hover:to-accent transition-all duration-300 shadow-md"
      >
        Ver projeto →
      </a>
    </article>
  );
}
