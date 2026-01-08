// app/page.tsx
import { getDictionary, TECHNOLOGY_ORDER } from "@/lib/i18n";
import { getPortfolioRepos, GitHubRepo } from "@/lib/github";
import { usePathname } from "next/navigation";
import ProjectSection from "./components/ProjectSection";

export default async function Home() {
  // Detecta idioma pela rota
  const pathname = usePathname() ?? "";
  const locale: "pt" | "en" = pathname.startsWith("/en") ? "en" : "pt";

  // Carrega dicionário e repositórios em paralelo
  const [dict, repos] = await Promise.all([
    getDictionary(locale),
    getPortfolioRepos(),
  ]);

  return (
    <section
      role="main"
      aria-label={locale === "en" ? "Main presentation" : "Apresentação inicial"}
      lang={locale === "en" ? "en-US" : "pt-BR"}
      className="container mx-auto max-w-5xl text-center px-4 lg:px-8 py-10 sm:py-16 space-y-6 sm:space-y-8"
    >
      {/* Título multilíngue */}
      <h1 className="font-bold text-[clamp(2rem,3vw+1rem,4rem)]">
        🚀 Sérgio Santos
      </h1>

      {/* Descrição multilíngue do portfólio */}
      <p className="text-[clamp(1rem,2.5vw,1.25rem)] text-gray-600 dark:text-gray-300">
        {dict.portfolio.title}
      </p>

      <p className="text-[clamp(0.875rem,2vw,1rem)] text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
        {dict.portfolio.description}
      </p>

      {/* Seções de projetos multilíngues */}
      <div className="mt-12 space-y-10 sm:space-y-12">
        {TECHNOLOGY_ORDER.map((tech) => {
          const filteredRepos = repos.filter((r: GitHubRepo) =>
            r.topics?.includes(tech)
          );
          if (!filteredRepos.length) return null;

          return (
            <ProjectSection
              key={tech}
              techKey={tech}
              repos={filteredRepos}
              dict={dict}
              lang={locale}
            />
          );
        })}
      </div>
    </section>
  );
}
