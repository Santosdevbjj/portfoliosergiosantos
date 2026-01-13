import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";

// Componentes customizados que você quer usar DENTRO do MDX
const mdxComponents = {
  h2: (props: any) => (
    <h2 {...props} className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white" />
  ),
  pre: (props: any) => (
    <pre {...props} className="rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg" />
  ),
  // Você pode adicionar um componente de gráfico de dados aqui depois!
};

interface MdxContentProps {
  source: string;
}

export default function MdxContent({ source }: MdxContentProps) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <MDXRemote
        source={source}
        components={mdxComponents}
        options={{
          mdxOptions: {
            rehypePlugins: [rehypeHighlight, rehypeSlug],
          },
        }}
      />
    </div>
  );
}
