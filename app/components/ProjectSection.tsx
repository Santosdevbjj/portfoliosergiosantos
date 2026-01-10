import ProjectCard from "./ProjectCard";
import type { GitHubRepo } from "@/lib/github";
import type { Locale, Translations } from "@/lib/i18n";

interface Props {
  techKey: keyof Translations["projectCategories"];
  repos: GitHubRepo[];
  dict: Translations["projectCategories"];
  lang: Locale;
}

export default function ProjectSection({ techKey, repos, dict, lang }: Props) {
  if (!repos || repos.length === 0) return null;

  const title = dict[techKey];
  if (!title) return null;

  return (
    <section
      role="region"
      aria-labelledby={`section-${techKey}`}
      aria-label={title}
      lang={lang === "en" ? "en-US" : lang === "es" ? "es-ES" : "pt-BR"}
      className="mb-8 sm:mb-12 px-4 md:px-6 lg:px-8"
    >
      <h2
        id={`section-${techKey}`}
        className="font-bold mb-6 text-[clamp(1.5rem,3vw+1rem,2.5rem)] text-gray-800 dark:text-gray-100"
      >
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
        {repos.map((repo) => (
          <ProjectCard key={repo.id} repo={repo} dict={dict} lang={lang} />
        ))}
      </div>
    </section>
  );
}
