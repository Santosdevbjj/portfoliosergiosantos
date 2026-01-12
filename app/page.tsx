// app/page.tsx
import type { Metadata } from "next";
import { getDictionary, TECHNOLOGY_ORDER } from "@/lib/i18n";
import { getPortfolioRepos, type GitHubRepo } from "@/lib/github";
import ProjectSection from "./components/ProjectSection";

/* 🔎 Metadata da homepage raiz (fallback / idioma padrão) */
export const metadata: Metadata = {
  title: "Sérgio Santos | Portfólio Profissional",
  description:
    "Portfólio profissional com projetos em Ciência de Dados, Engenharia de Software e Inteligência Artificial.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sérgio Santos | Portfólio Profissional",
    description:
      "Projetos técnicos e estudos aplicados em dados, software e IA.",
    siteName: "Portfólio Sérgio Santos",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sérgio Santos | Portfólio Profissional",
    description:
      "Projetos técnicos e estudos aplicados em dados, software e IA.",
  },
};

export default async function Home() {
  const locale: "pt" | "en" | "es" = "pt";

  // Dados carregados no servidor
  const [dict, repos] = await Promise.all([
    getDictionary(locale),
    getPortfolioRepos({ next: { revalidate: 60 } }),
  ]);

  return (
    <main
      lang="pt-BR"
      className="
        container mx-auto max-w-5xl
        px-4 lg:px-8
        py-10 sm:py-16
        space-y-8
        text-center
        bg-surface-light dark:bg-surface-dark
        transition-colors
      "
    >
      {/* TÍTULO */}
      <h1 className="font-bold text-[clamp(2rem,3vw+1rem,4rem)]">
        🚀 Sérgio Santos
      </h1>

      {/* SUBTÍTULO */}
      <p className="text-[clamp(1rem,2.5vw,1.25rem)] text-slate-600 dark:text-slate-300">
        {dict.portfolio.title}
      </p>

      {/* DESCRIÇÃO */}
      <p className="max-w-3xl mx-auto text-slate-500 dark:text-slate-400 leading-relaxed">
        {dict.portfolio.description}
      </p>

      {/* SEÇÕES DE PROJETOS POR TECNOLOGIA */}
      <section
        className="mt-12 space-y-12"
        aria-label={dict.portfolio.projects}
      >
        {TECHNOLOGY_ORDER.map((tech) => {
          const filteredRepos = repos.filter((repo: GitHubRepo) =>
            repo.topics?.includes(tech)
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
      </section>
    </main>
  );
}
