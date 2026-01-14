import { Dictionary } from "@/lib/i18n";
import { Award, ExternalLink, Newspaper, Share2 } from "lucide-react";

interface Props {
  dict: Dictionary["sections"];
  article: Dictionary["featuredArticle"];
}

export default function FeaturedArticleSection({ dict, article }: Props) {
  return (
    <section 
      aria-labelledby="featured-heading"
      className="w-full bg-white dark:bg-slate-900/40 rounded-[3rem] border border-slate-200 dark:border-slate-800/60 shadow-2xl shadow-blue-500/5 overflow-hidden group transition-all duration-700 hover:border-blue-500/40 backdrop-blur-sm"
    >
      <div className="flex flex-col md:flex-row min-h-[400px]">
        
        {/* CONTEÚDO TEXTUAL */}
        <div className="flex-1 p-8 md:p-16 space-y-8 flex flex-col justify-center">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.3em] shadow-lg shadow-blue-500/20">
              <Award size={14} className="animate-pulse" />
              {dict.featuredArticle}
            </span>
          </div>

          <div className="space-y-4">
            <h2 id="featured-heading" className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tighter">
              {article.title}
            </h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium max-w-2xl">
              {article.description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {[article.award1, article.award2].filter(Boolean).map((award, i) => (
              <div key={i} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-4 py-2 rounded-xl border border-amber-100 dark:border-amber-900/30">
                <Award size={12} className="fill-amber-500/20" />
                {award}
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-slate-100 dark:border-slate-800/50 flex flex-col lg:flex-row lg:items-center gap-6">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              {article.readOn}
            </span>
            
            <div className="flex flex-wrap items-center gap-4">
              {[
                { name: 'DIO', url: article.links.dio, color: 'hover:text-blue-600' },
                { name: 'LinkedIn', url: article.links.linkedin, color: 'hover:text-[#0077b5]' },
                { name: 'Medium', url: article.links.medium, color: 'hover:text-slate-900 dark:hover:text-white' }
              ].map((platform) => (
                <a 
                  key={platform.name}
                  href={platform.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs font-bold text-slate-600 dark:text-slate-300 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700 ${platform.color} group/link`}
                >
                  {platform.name}
                  <ExternalLink size={14} className="opacity-40 group-hover/link:opacity-100 transition-all group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* ÁREA VISUAL (TECHNICAL PREVIEW) */}
        <div className="w-full md:w-[38%] bg-slate-50 dark:bg-slate-900/50 p-12 flex items-center justify-center relative overflow-hidden border-l border-slate-100 dark:border-slate-800/50">
          {/* Decoração de Fundo Progressiva */}
          <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08] pointer-events-none transition-transform duration-[2000ms] group-hover:scale-150" 
               style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          
          <div className="relative z-10 w-full aspect-square max-w-[240px] rounded-[2.5rem] bg-white dark:bg-slate-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center p-8 transform group-hover:-rotate-3 group-hover:scale-105 transition-all duration-700 ease-out">
             <div className="p-5 rounded-[2rem] bg-blue-50 dark:bg-blue-900/20 mb-6 group-hover:scale-110 transition-transform duration-500">
                <Newspaper size={48} className="text-blue-600" />
             </div>
             
             <div className="space-y-2 flex flex-col items-center w-full">
                <div className="h-2 w-24 bg-slate-100 dark:bg-slate-800 rounded-full" />
                <div className="h-2 w-16 bg-slate-100 dark:bg-slate-800 rounded-full opacity-50" />
             </div>
             
             {/* Selo Flutuante Estilizado */}
             <div className="absolute -top-4 -right-4 h-14 w-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-2xl shadow-blue-500/40 rotate-12 group-hover:rotate-[25deg] transition-transform duration-500">
                <Share2 size={24} />
             </div>
          </div>

          {/* Luz lateral decorativa */}
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-40 h-80 bg-blue-600/10 blur-[100px] pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
