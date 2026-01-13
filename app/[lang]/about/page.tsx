import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { getProjectBySlug, type Lang } from "@/lib/mdx";
import { i18n } from "@/lib/i18n";

// Definindo o slug fixo para a página "Sobre"
const ABOUT_SLUG = "about";

interface PageProps {
  params: Promise<{ lang: Lang }>;
}

/** 🔎 SEO Dinâmico e Internacionalizado */
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lang } = await props.params;
  const about = await getProjectBySlug(ABOUT_SLUG, lang);

  if (!about) {
    return { title: "Página não encontrada" };
  }

  const baseUrl = "https://portfoliosergiosantos.vercel.app";
  const path = "/about";

  return {
    title: `${about.metadata.title} | Sérgio Santos`,
    description: about.metadata.description || "Biografia profissional e trajetória técnica.",
    alternates: {
      canonical: `${baseUrl}/${lang}${path}`,
      languages: {
        "pt-BR": `${baseUrl}/pt${path}`,
        "en-US": `${baseUrl}/en${path}`,
        "es-ES": `${baseUrl}/es${path}`,
      },
    },
    openGraph: {
      title: about.metadata.title,
      description: about.metadata.description,
      url: `${baseUrl}/${lang}${path}`,
      siteName: "Portfólio Sérgio Santos",
      locale: lang === "en" ? "en_US" : lang === "es" ? "es_ES" : "pt_BR",
      type: "profile",
    },
  };
}

/** 🚀 Gera os caminhos estáticos para cada idioma no build */
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function AboutPage(props: PageProps) {
  const { lang } = await props.params;
  const about = await getProjectBySlug(ABOUT_SLUG, lang);

  if (!about) return notFound();

  return (
    <main className="container mx-auto max-w-4xl px-4 py-12 md:py-20 min-h-screen">
      <article 
        className="
          prose prose-slate dark:prose-invert 
          prose-technical dark:prose-darkTechnical 
          max-w-none 
          prose-img:rounded-3xl prose-img:shadow-2xl
          prose-headings:text-slate-900 dark:prose-headings:text-white
        "
      >
        <MDXRemote source={about.content} />
      </article>
    </main>
  );
}
