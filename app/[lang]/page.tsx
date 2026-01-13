import { Metadata } from "next";
import PageWrapper from "@/components/PageWrapper";
import HeroSection from "@/components/HeroSection";
import FeaturedProject from "@/components/FeaturedProject";
import ProjectsSection from "@/components/ProjectsSection";
import FeaturedArticleSection from "@/components/FeaturedArticleSection";
import { getDictionary } from "@/lib/i18n";
import {
  getPortfolioRepos,
  CATEGORIES_ORDER,
  CategoryKey,
  GitHubRepo,
} from "@/lib/github";

// Otimização de Cache e Static Generation
export const dynamic = "force-static";
export const revalidate = 3600;

interface Props {
  params: Promise<{ lang: "pt" | "en" | "es" }>; // Ajustado para Promise (Padrão Next.js 15)
}

/** 🔎 SEO Dinâmico e Social Media */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = getDictionary(lang);
  
  return {
    title: `Sérgio Santos | ${t.sections.projectsTitle}`,
    description: t.portfolio.description,
    openGraph: {
      images: [`/og-image-${lang}.png`], // Link dinâmico para as imagens que você tem no /public
    },
  };
}

export default async function Page({ params }: Props) {
  // Garantia de acesso aos params (Next.js 15 pattern)
  const { lang } = await params;
  const t = getDictionary(lang);

  // Inicialização segura do estado de repositórios
  let repos: Record<CategoryKey, GitHubRepo[]> = {} as Record<CategoryKey, GitHubRepo[]>;
  CATEGORIES_ORDER.forEach(key => {
    repos[key] = [];
  });

  try {
    const fetchedRepos = await getPortfolioRepos();
    if (fetchedRepos && Object.keys(fetchedRepos).length > 0) {
      repos = fetchedRepos as Record<CategoryKey, GitHubRepo[]>;
    }
  } catch (error) {
    console.error("Erro ao carregar repositórios do GitHub:", error);
  }

  const categoryMap: Record<CategoryKey, string> = {
    dataScience: t.projectCategories.dataScience,
    azureDatabricks: t.projectCategories.azureDatabricks,
    neo4j: t.projectCategories.neo4j,
    powerBI: t.projectCategories.powerBI,
    database: t.projectCategories.database,
    python: t.projectCategories.python,
    dotnet: t.projectCategories.dotnet,
    java: t.projectCategories.java,
    machineLearning: t.projectCategories.machineLearning,
    aws: t.projectCategories.aws,
    cybersecurity: t.projectCategories.cybersecurity,
    logic: t.projectCategories.logic,
    html: t.projectCategories.html,
    articlesRepo: t.projectCategories.articlesRepo,
  };

  const hasProjects = Object.values(repos).some(
    (projects) => projects && projects.length > 0
  );

  return (
    <PageWrapper lang={lang}>
      {/* Sincronizado com as novas props do HeroSection */}
      <HeroSection dict={t} lang={lang} />

      <main role="main" className="space-y-24 pb-20 mt-10">
        <FeaturedProject dict={t} />

        <section className="max-w-7xl mx-auto px-4" aria-labelledby="featured-article-title">
          <FeaturedArticleSection dict={t.sections} article={t.featuredArticle} />
        </section>

        {/* Seção de Experiência e Skills */}
        <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12" aria-labelledby="experience-title">
          <div>
            <h2 id="experience-title" className="text-3xl font-bold mb-6 border-b-2 border-blue-600 pb-2 w-fit">
              {t.sections.experienceTitle}
            </h2>
            <ul className="space-y-4 text-lg text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2"><span>✅</span> {t.experience.item1}</li>
              <li className="flex items-start gap-2"><span>✅</span> {t.experience.item2}</li>
              <li className="flex items-start gap-2"><span>✅</span> {t.experience.item3}</li>
            </ul>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800/50 p-6 rounded-2xl space-y-4 border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 uppercase text-xs tracking-widest">Skills Overview</h3>
            <p className="text-base">
              <strong className="text-slate-900 dark:text-white">{t.sections.stackConsolidated}:</strong><br />
              <span className="text-slate-600 dark:text-slate-400">{t.experience.stackConsolidated}</span>
            </p>
            <p className="text-base">
              <strong className="text-slate-900 dark:text-white">{t.sections.stackUpdating}:</strong><br />
              <span className="text-slate-600 dark:text-slate-400">{t.experience.stackUpdating}</span>
            </p>
          </div>
        </section>

        {/* Seção Dinâmica de Projetos (GitHub) */}
        <section className="max-w-7xl mx-auto px-4" aria-labelledby="projects-title">
          <h2 id="projects-title" className="text-3xl font-bold mb-8 flex items-center gap-2">
            <span>📂</span> {t.sections.projectsTitle}
          </h2>

          {!hasProjects ? (
            <p className="text-slate-500 text-lg italic">
              {t.sections.projectsEmpty || "Carregando projetos..."}
            </p>
          ) : (
            <div className="space-y-16">
              {CATEGORIES_ORDER.map((key) => {
                const projects = repos[key];
                if (!projects || projects.length === 0) return null;

                return (
                  <ProjectsSection 
                    key={key}
                    title={categoryMap[key] || "Outros"}
                    projects={projects}
                  />
                );
              })}
            </div>
          )}
        </section>
      </main>
    </PageWrapper>
  );
}
