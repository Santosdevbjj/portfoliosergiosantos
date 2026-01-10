import type { Metadata } from "next";
import { type Lang } from "@/lib/mdx";

interface PageProps {
  params: { lang: Lang };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = params;

  const title =
    lang === "en"
      ? "Projects – Search and Filter"
      : lang === "es"
      ? "Proyectos – Buscar y Filtrar"
      : "Projetos – Busca e Filtros";

  const description =
    lang === "en"
      ? "Explore all portfolio projects with search and tag filters. Fully responsive and multilingual."
      : lang === "es"
      ? "Explora todos los proyectos del portafolio con búsqueda y filtros por etiquetas. Totalmente responsivo y multilingüe."
      : "Explore todos os projetos do portfólio com busca e filtros por tags. Totalmente responsivo e multilíngue.";

  const baseUrl = "https://seusite.com"; // ajuste para seu domínio real
  const path = "/projects/list";

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
      type: "website",
      images: ["/og-image.png"], // ajuste para sua imagem OG real
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}
