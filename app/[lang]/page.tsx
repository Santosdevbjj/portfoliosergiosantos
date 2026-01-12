// app/[lang]/page.tsx
import PageWrapper from "@/components/PageWrapper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectSection from "@/components/ProjectSection";
import FeaturedArticleSection from "@/components/FeaturedArticleSection";
import { getTranslation } from "@/lib/i18n";
import { getPortfolioRepos, Category, CATEGORIES_ORDER, GitHubRepo } from "@/lib/github";

interface Props {
  params: { lang: "pt" | "en" | "es" };
}

export default async function Page({ params }: Props) {
  const t = getTranslation(params.lang);
  const repos = await getPortfolioRepos();

  // Mapa de correspondência entre categorias do GitHub (kebab-case)
  // e traduções do i18n.ts (camelCase)
  const categoryMap: Record<Category, string> = {
    "data-science": t.projectCategories.dataScience,
    "azure-databricks": t.projectCategories.azureDatabricks,
    "neo4j": t.projectCategories.neo4j,
    "power-bi": t.projectCategories.powerBI,
    "database": t.projectCategories.database,
    "python": t.projectCategories.python,
    "csharp": t.projectCategories.dotnet,
    "dotnet": t.projectCategories.dotnet,
    "java": t.projectCategories.java,
    "machine-learning": t.projectCategories.machineLearning,
    "amazon-aws": t.projectCategories.aws,
    "cybersecurity": t.projectCategories.cybersecurity,
    "programming-logic": t.projectCategories.logic,
    "html": t.projectCategories.html,
    "articles-repo": t.projectCategories.articlesRepo,
  };

  return (
    <PageWrapper>
      <Header lang={params.lang} dict={t.navigation} />

      <main
        role="main"
        className="flex-1 p-4 max-w-7xl mx-auto"
      >
        {/* Personal Introduction */}
        <section className="mb-8" aria-labelledby="about-title">
          <h1 id="about-title" className="text-3xl sm:text-4xl font-bold mb-2">
            {t.sections.aboutTitle}
          </h1>
          <p className="text-lg sm:text-xl">{t.sections.aboutIntro}</p>
          <p className="mt-2 text-base sm:text-lg prose dark:prose-invert">
            {t.sections.aboutDetails}
          </p>
        </section>

        {/* Featured Article Section */}
        <section className="mb-8" aria-labelledby="featured-article-title">
          <h2 id="featured-article-title" className="sr-only">
            {t.sections.featuredArticleTitle}
          </h2>
          <FeaturedArticleSection dict={t.sections} article={t.featuredArticle} />
        </section>

        {/* Technical Experience */}
        <section className="mb-8" aria-labelledby="experience-title">
          <h2 id="experience-title" className="text-2xl font-bold mb-4">
            {t.sections.experienceTitle}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-base">
            <li>{t.experience.item1}</li>
            <li>{t.experience.item2}</li>
            <li>{t.experience.item3}</li>
          </ul>
          <p className="mt-2 text-base">
            <strong>{t.sections.stackConsolidated}:</strong> {t.experience.stackConsolidated}
          </p>
          <p className="mt-1 text-base">
            <strong>{t.sections.stackUpdating}:</strong> {t.experience.stackUpdating}
          </p>
        </section>

        {/* Projects by Technology */}
        <section className="mb-8" aria-labelledby="projects-title">
          <h2 id="projects-title" className="text-2xl font-semibold text-blue-600 mb-4">
            📂 {t.sections.projectsTitle}
          </h2>
          {(Object.entries(repos) as [Category, GitHubRepo[]][])
            .sort(([a], [b]) => CATEGORIES_ORDER.indexOf(a) - CATEGORIES_ORDER.indexOf(b))
            .map(([cat, projects]) => (
              <ProjectSection
                key={cat}
                title={categoryMap[cat] || t.projectCategories.unknown}
                projects={projects}
              />
            ))}
        </section>
      </main>

      <Footer lang={params.lang} dict={t.footer} />
    </PageWrapper>
  );
}
