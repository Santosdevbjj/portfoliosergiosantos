import ProjectCard from "./ProjectCard";
import type { GitHubRepo } from "@/lib/github";
import type { Locale } from "@/lib/i18n";

interface ProjectSectionProps {
  title: string;
  repos: GitHubRepo[];
  lang: Locale;
  sectionId: string;
}

export default function ProjectSection({
  title,
  repos,
  lang,
  sectionId,
}: ProjectSectionProps) {
  if (!repos?.length) return null;

  const htmlLang =
    lang === "en" ? "en-US" : lang === "es" ? "es-ES" : "pt-BR";

  return (
    <section
      aria-labelledby={sectionId}
      lang={htmlLang}
      className="mb-10 sm:mb-14 px-4 md:px-6 lg:px-8"
    >
      <h2
        id={sectionId}
        className="
          mb-6
          font-bold
          text-[clamp(1.5rem,3vw+1rem,2.5rem)]
          text-gray-800 dark:text-gray-100
        "
      >
        {title}
      </h2>

      <div
        className="
          grid
          grid-cols-1
          gap-6 gap-y-8
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          auto-rows-fr
        "
      >
        {repos.map((repo) => (
          <ProjectCard key={repo.id} repo={repo} lang={lang} />
        ))}
      </div>
    </section>
  );
}
