// app/components/ProjectCard.tsx
import { GitHubRepo } from "@/lib/github";

interface ProjectCardProps {
  repo: GitHubRepo;
}

export default function ProjectCard({ repo }: ProjectCardProps) {
  return (
    <article className="
      border border-gray-200 dark:border-gray-700
      rounded-xl p-6 transition-transform transform
      hover:-translate-y-2 hover:shadow-2xl
      bg-gradient-to-br from-white/50 to-white/20 dark:from-gray-900/50 dark:to-gray-800/30
      backdrop-blur-md
      flex flex-col justify-between
    ">
      <div className="mb-4">
        <h3 className="text-[clamp(1.25rem,3vw,1.75rem)] font-bold mb-2
                       bg-clip-text text-transparent
                       bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-textGradient">
          {repo.name}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
          {repo.description || "Descrição não disponível."}
        </p>
      </div>

      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="
          mt-auto inline-block font-semibold
          bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
          text-white px-4 py-2 rounded-lg
          shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl
        "
      >
        Ver projeto →
      </a>
    </article>
  );
}
