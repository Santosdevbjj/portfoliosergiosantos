import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import Callout from "./Callout";
import CalloutPersistent from "./CalloutPersistent";

const mdxComponents = {
  Callout,
  CalloutPersistent,
  
  // Títulos com ancoragem e estilo premium
  h2: (props: any) => (
    <h2 
      {...props} 
      className="text-3xl md:text-4xl font-black mt-20 mb-8 text-slate-900 dark:text-white tracking-tighter border-b-4 border-blue-600/10 pb-4" 
    />
  ),
  h3: (props: any) => (
    <h3 {...props} className="text-xl md:text-2xl font-black mt-12 mb-4 text-slate-800 dark:text-slate-100 tracking-tight" />
  ),
  
  // Parágrafos com legibilidade de engenharia
  p: (props: any) => (
    <p {...props} className="text-lg leading-relaxed text-slate-600 dark:text-slate-400 mb-6 font-medium" />
  ),

  // Blocos de Código estilo "IDE"
  pre: (props: any) => (
    <div className="relative my-10 group">
      {/* Header do Bloco de Código */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-slate-200/50 dark:bg-slate-800/80 border-b border-slate-300/50 dark:border-slate-700/50 flex items-center px-4 gap-1.5 rounded-t-2xl">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
      </div>
      <pre 
        {...props} 
        className="pt-14 pb-6 px-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-50 dark:bg-[#0d1117] overflow-x-auto text-sm md:text-base leading-relaxed scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700" 
      />
    </div>
  ),

  // Listas
  ul: (props: any) => <ul {...props} className="list-none space-y-4 my-8" />,
  li: (props: any) => (
    <li className="flex items-start gap-3 text-lg text-slate-600 dark:text-slate-400 font-medium">
      <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
      <span>{props.children}</span>
    </li>
  ),

  // Tabelas de Dados Profissionais
  table: (props: any) => (
    <div className="my-12 overflow-x-auto rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
      <table {...props} className="min-w-full border-collapse" />
    </div>
  ),
  th: (props: any) => (
    <th {...props} className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 border-b border-slate-200 dark:border-slate-800" />
  ),
  td: (props: any) => (
    <td {...props} className="px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800/50 group-hover:bg-slate-50/50 transition-colors" />
  ),
};

interface MdxContentProps {
  source: string;
}

export default function MdxContent({ source }: MdxContentProps) {
  return (
    <div className="
      max-w-4xl mx-auto
      prose prose-slate dark:prose-invert prose-lg
      prose-headings:scroll-mt-28
      prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
      prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-black
      prose-img:rounded-[2.5rem] prose-img:shadow-2xl prose-img:border prose-img:border-slate-100 dark:prose-img:border-slate-800
    ">
      <MDXRemote
        source={source}
        components={mdxComponents}
        options={{
          mdxOptions: {
            rehypePlugins: [
              rehypeHighlight, 
              rehypeSlug,
              [rehypeAutolinkHeadings, { 
                behavior: "wrap",
                properties: { className: ["anchor-link"] } 
              }]
            ],
          },
        }}
      />
    </div>
  );
}
