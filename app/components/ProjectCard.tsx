import { GitHubRepo } from "@/lib/github";

interface ProjectCardProps {
  repo: GitHubRepo;
}

export default function ProjectCard({ repo }: ProjectCardProps) {
  return (
    <article className="
      border border-gray-200 dark:border-gray-700 rounded-xl p-6
      bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700
      shadow-md hover:shadow-2xl
      transition-transform duration-500 transform hover:-translate-y-1
      hover:scale-105
      flex flex-col justify-between
    ">
      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-textGradient">
        {repo.name}
      </h3>

      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 flex-grow">
        {repo.description || "Descrição não disponível."}
      </p>

      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-block px-4 py-2 rounded-lg
          bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500
          text-white font-medium shadow-lg
          hover:scale-105 hover:shadow-2xl
          transition-all duration-300
        "
      >
        Ver projeto →
      </a>
    </article>
  );
}
