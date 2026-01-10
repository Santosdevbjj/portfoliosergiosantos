import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { getProjectBySlug, listSlugsByLang, type Lang } from "@/lib/mdx";

interface PageProps {
  params: { lang: Lang; slug: string };
}

export async function generateStaticParams() {
  const langs: Lang[] = ["pt", "en", "es"];
  const params: { lang: Lang; slug: string }[] = [];

  for (const lang of langs) {
    const slugs = await listSlugsByLang(lang);
    for (const slug of slugs) {
      params.push({ lang, slug });
    }
  }

  return params;
}

/** SEO dinâmico para cada projeto */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = params;
  const project = await getProjectBySlug(slug, lang);

  if (!project) {
    return {
      title: "Projeto não encontrado",
      description: "O conteúdo solicitado não foi localizado.",
    };
  }

  const title = project.metadata.title ?? slug;
  const description =
    project.metadata.description ??
    (lang === "en"
      ? `Project ${slug} in English`
      : lang === "es"
      ? `Proyecto ${slug} en español`
      : `Projeto ${slug} em português`);

  const baseUrl = "https://seusite.com"; // ajuste para seu domínio real
  const path = `/projects/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${lang}${path}`,
      languages: {
        "pt-BR": `${baseUrl}/pt${path}`,
        "en-US": `${baseUrl}/en${path}`,
        "es-ES": `${baseUrl}/es${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${lang}${path}`,
      siteName: "Portfólio Sergio Santos",
      locale: lang === "en" ? "en_US" : lang === "es" ? "es_ES" : "pt_BR",
      type: "article",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const project = await getProjectBySlug(params.slug, params.lang);
  if (!project) return notFound();

  const localeAttr =
    params.lang === "en" ? "en-US" : params.lang === "es" ? "es-ES" : "pt-BR";

  return (
    <article
      lang={localeAttr}
      className="container py-10 space-y-6"
      aria-label={
        params.lang === "en"
          ? "Project article"
          : params.lang === "es"
          ? "Artículo del proyecto"
          : "Artigo do projeto"
      }
    >
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

      <div className="prose prose-technical dark:prose-darkTechnical max-w-none">
        <MDXRemote source={project.content} />
      </div>
    </article>
  );
}
