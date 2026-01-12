import type { GitHubRepo } from "@/lib/github";
import type { Locale } from "@/lib/i18n";

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
  const htmlLang =
    lang === "en" ? "en-US" : lang === "es" ? "es-ES" : "pt-BR";

  return (
    <article
      aria-labelledby={`repo-${repo.id}-title`}
      lang={htmlLang}
      className="
        w-full
        p-4 sm:p-6
        rounded-xl
        border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-800
        shadow-lg
        transition
        duration-300
        hover:scale-105 hover:shadow-2xl
      "
    >
      {/* Nome do repositório */}
      <h3
        id={`repo-${repo.id}-title`}
        className="
          mb-2
          font-bold
          text-[clamp(1rem,2vw+0.5rem,1.25rem)]
          text-transparent
          bg-clip-text
          bg-gradient-to-r from-purple-500 to-pink-500
        "
      >
        {repo.name}
      </h3>

      {/* Descrição */}
      <p className="mb-4 text-[clamp(0.875rem,2vw,1rem)] text-gray-600 dark:text-gray-300">
        {repo.description || descriptionFallback}
      </p>

      {/* Link */}
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        title={ariaLabel}
        className="
          inline-block
          rounded-md
          bg-gradient-to-r from-purple-500 to-pink-500
          px-[clamp(0.75rem,2vw,1rem)]
          py-[clamp(0.5rem,1.5vw,0.75rem)]
          font-semibold text-white
          transition-transform duration-300
          hover:scale-105
          focus-visible:outline focus-visible:outline-2
          focus-visible:outline-offset-2
          focus-visible:outline-purple-500
        "
      >
        {buttonLabel}
      </a>
    </article>
  );
}
