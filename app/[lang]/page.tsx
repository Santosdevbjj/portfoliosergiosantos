import PageWrapper from "@/components/PageWrapper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectSection from "@/components/ProjectSection";
import { translations } from "@/lib/i18n";
import { getPortfolioRepos } from "@/lib/github";

interface Props {
  params: { lang: "pt" | "en" };
}

export default async function Page({ params }: Props) {
  const t = translations[params.lang];
  const repos = await getPortfolioRepos();

  return (
    <PageWrapper>
      <Header lang={params.lang} />
      <main className="flex-1 p-4 max-w-7xl mx-auto">
        {/* Sobre mim */}
        <section className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            {t.sections.aboutTitle}
          </h1>
          <p className="text-base sm:text-lg md:text-xl">
            {t.sections.aboutIntro}
          </p>
          <p className="mt-2 text-sm sm:text-base md:text-lg">
            {t.sections.aboutDetails}
          </p>
        </section>

        {/* Experiência Técnica */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
            {t.sections.experienceTitle}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm sm:text-base md:text-lg">
            <li>
              Sistema automatizado de IPVA eliminando{" "}
              <strong>2.920 horas anuais</strong> de processamento manual
            </li>
            <li>
              Infraestrutura de rede corporativa para 500+ usuários com{" "}
              <strong>99,5% de disponibilidade</strong>
            </li>
            <li>
              Sistemas jurídicos interdepartamentais com rastreabilidade completa
              e conformidade LGPD
            </li>
          </ul>
          <p className="mt-2 text-sm sm:text-base md:text-lg">
            <strong>{t.sections.stackConsolidated}:</strong> Visual Basic, C,
            SQL Server, Windows Server, Emulação Mainframe IBM, Active Directory
          </p>
          <p className="mt-1 text-sm sm:text-base md:text-lg">
            <strong>{t.sections.stackUpdating}:</strong> Java, C#/.NET, Python,
            Azure Databricks, Azure AI, Power BI, Machine Learning, Docker,
            Neo4J
          </p>
        </section>

        {/* Projetos */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
            {t.sections.projectsTitle}
          </h2>
          {Object.entries(repos).map(([cat, projects]) => (
            <ProjectSection key={cat} title={cat} projects={projects} />
          ))}
        </section>

        {/* Artigos em destaque */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
            {t.sections.articlesTitle}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm sm:text-base md:text-lg">
            <li>
              <a
                href="https://github.com/Santosdevbjj/myArticles/blob/main/artigos/low_code/low_code_saude.md"
                target="_blank"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Low-Code na Saúde: Como Criar Apps Médicos em Semanas 🏆
              </a>
            </li>
          </ul>
        </section>
      </main>
      <Footer lang={params.lang} dict={t} />
    </PageWrapper>
  );
}
