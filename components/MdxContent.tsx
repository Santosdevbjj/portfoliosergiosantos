import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import Callout from "./Callout";
import CalloutPersistent from "./CalloutPersistent";

// Customizamos os componentes MDX para manter a coerência com seu design "Bento"
const mdxComponents = {
  // Alertas e Notas
  Callout,
  CalloutPersistent,
  
  // Tipografia Técnica
  h2: (props: any) => (
    <h2 
      {...props} 
      className="text-2xl md:text-3xl font-black mt-12 mb-6 text-slate-900 dark:text-white tracking-tight border-b border-slate-100 dark:border-slate-800 pb-2" 
    />
  ),
  h3: (props: any) => (
    <h3 {...props} className="text-xl font-bold mt-8 mb-4 text-slate-800 dark:text-slate-100" />
  ),
  
  // Blocos de Código (Engineering Style)
  pre: (props: any) => (
    <pre 
      {...props} 
      className="relative rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-50 dark:bg-slate-900/50 my-8 overflow-hidden transition-all" 
    />
  ),
  code: (props: any) => (
    <code {...props} className="text-sm md:text-base leading-relaxed" />
  ),

  // Tabelas de Dados (Essencial para Data Eng)
  table: (props: any) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
      <table {...props} className="min-w-full divide-y divide-slate-200 dark:divide-slate-800" />
    </div>
  ),
  th: (props: any) => (
    <th {...props} className="px-6 py-3 bg-slate-50 dark:bg-slate-800 text-left text-xs font-black uppercase tracking-widest text-slate-500" />
  ),
  td: (props: any) => (
    <td {...props} className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800" />
  ),
};

interface MdxContentProps {
  source: string;
}

export default function MdxContent({ source }: MdxContentProps) {
  return (
    <div className="
      prose prose-slate dark:prose-invert max-w-none
      prose-headings:scroll-mt-24
      prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-400
      prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
      prose-strong:text-slate-900 dark:prose-strong:text-white
      prose-img:rounded-3xl prose-img:shadow-2xl
    ">
      <MDXRemote
        source={source}
        components={mdxComponents}
        options={{
          mdxOptions: {
            // Adicionamos Autolink para que o usuário possa copiar links de seções específicas
            rehypePlugins: [
              rehypeHighlight, 
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: "wrap" }]
            ],
          },
        }}
      />
    </div>
  );
}
