import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, listSlugsByLang, type Lang } from "@/lib/mdx";
import { i18n, type Locale } from "@/lib/i18n";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Calendar, Tag, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ lang: Locale; slug: string }>;
}

/** 🚀 SSG: Gera todos os caminhos de artigos no build */
export async function generateStaticParams() {
  const paths: { lang: string; slug: string }[] = [];

  for (const lang of i18n.locales) {
    const slugs = await listSlugsByLang(lang as Lang);
    slugs.forEach((slug) => {
      paths.push({ lang, slug });
    });
  }

  return paths;
}

/** 🔎 SEO: Metadados específicos do Artigo */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const article = await getProjectBySlug(slug, lang as Lang);

  if (!article) return { title: "Artigo não encontrado" };

  return {
    title: `${article.metadata.title} | Sérgio Santos`,
    description: article.metadata.description,
    openGraph: {
      title: article.metadata.title,
      description: article.metadata.description,
      type: "article",
      publishedTime: article.metadata.date,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/articles/${slug}`,
      images: [
        {
          url: `/og-image-${lang}.png`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { lang, slug } = await params;
  
  // Usando nossa lib centralizada para buscar o conteúdo
  const article = await getProjectBySlug(slug, lang as Lang);

  if (!article) notFound();

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
      {/* Barra de navegação superior interna */}
      <div className="border-b border-slate-100 dark:border-slate-800/50 sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link 
            href={`/${lang}#projects`} 
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ChevronLeft size={16} />
            {lang === "pt" ? "Voltar ao Portfólio" : lang === "es" ? "Volver" : "Back to Portfolio"}
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest">
              <Tag size={12} />
              {article.metadata.tags?.[0] || "Engineering"}
            </div>
            {article.metadata.date && (
              <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                <Calendar size={14} />
                <time dateTime={article.metadata.date}>{article.metadata.date}</time>
              </div>
            )}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8 tracking-tight">
            {article.metadata.title}
          </h1>
          
          {article.metadata.description && (
            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium italic border-l-4 border-blue-600 pl-6">
              {article.metadata.description}
            </p>
          )}
        </header>

        {/* Renderizador MDX de Alta Performance */}
        <section className="prose prose-lg md:prose-xl prose-slate dark:prose-invert max-w-none 
          prose-headings:text-slate-900 dark:prose-headings:text-white prose-headings:font-black
          prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-400
          prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
          prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:bg-blue-50 dark:prose-code:bg-blue-900/20 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-slate-900 dark:prose-pre:bg-slate-900/80 prose-pre:shadow-2xl prose-pre:rounded-3xl
          prose-img:rounded-3xl prose-img:shadow-2xl">
          <MDXRemote source={article.content} />
        </section>

        {/* Rodapé do Artigo */}
        <footer className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-800">
           <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 text-center">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {lang === "pt" ? "Gostou da leitura?" : lang === "es" ? "¿Te gustó el artículo?" : "Enjoyed the read?"}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                {lang === "pt" ? "Conecte-se comigo para discutir este projeto ou novas tecnologias." : "Let's connect to discuss this project or new technologies."}
              </p>
              <Link 
                href={`/${lang}#contact`}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-500/20"
              >
                {lang === "pt" ? "Entrar em contato" : "Get in touch"}
              </Link>
           </div>
        </footer>
      </article>
    </main>
  );
}
