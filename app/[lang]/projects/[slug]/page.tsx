import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProjectBySlug, type Lang } from "@/lib/mdx";
import CalloutPersistent from "@/components/CalloutPersistent";

interface PageProps {
  params: { lang: Lang; slug: string };
}

export default async function ProjectPage({ params }: PageProps) {
  const project = await getProjectBySlug(params.slug, params.lang);
  if (!project) return notFound();

  return (
    <article className="container py-10 space-y-6">
      <header>
        <h1 className="animate-textGradient mb-2 font-bold text-[clamp(2rem,4vw,3rem)]">
          {project.metadata.title}
        </h1>
        {project.metadata.date && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {project.metadata.date}
          </p>
        )}
        {project.metadata.description && (
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {project.metadata.description}
          </p>
        )}
      </header>

      {/* Callout persistente de navegação */}
      <CalloutPersistent id={`lang-tip-${params.slug}`} type="info" lang={params.lang}>
        {params.lang === "en" && "Use the LanguageSwitcher to view this project in other languages."}
        {params.lang === "es" && "Usa el LanguageSwitcher para ver este proyecto en otros idiomas."}
        {params.lang === "pt" && "Use o LanguageSwitcher para ver este projeto em outros idiomas."}
      </CalloutPersistent>

      <div className="prose prose-technical dark:prose-darkTechnical max-w-none">
        <MDXRemote source={project.content} />
      </div>
    </article>
  );
}
