"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  const lang = (params?.lang as string) || "en";

  // Textos de fallback caso o erro ocorra antes do dicionário carregar
  const content = {
    pt: {
      title: "Ops! Algo deu errado",
      desc: "Ocorreu um erro inesperado. Nossa equipe técnica foi notificada automaticamente.",
      retry: "Tentar novamente",
      home: "Voltar para Home",
    },
    en: {
      title: "Something went wrong!",
      desc: "An unexpected error occurred. Our technical team has been automatically notified.",
      retry: "Try again",
      home: "Back to Home",
    },
    es: {
      title: "¡Algo saiu mal!",
      desc: "Ocurrió un error inesperado. Nuestro equipo técnico ha sido notificado automáticamente.",
      retry: "Reintentar",
      home: "Volver al Inicio",
    },
  }[lang] || {
    title: "Something went wrong!",
    desc: "An unexpected error occurred.",
    retry: "Try again",
    home: "Back to Home",
  };

  useEffect(() => {
    // 1. Console log para debug local e Vercel Runtime logs
    console.error("Next.js Error Boundary:", error);

    // 2. Envio para seu Proxy de Log (BetterStack)
    const reportError = async () => {
      try {
        await fetch("/api/log", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            level: "critical",
            message: error.message || "Next.js Rendering Error",
            digest: error.digest,
            stack: error.stack?.substring(0, 1000), // Limita tamanho do log
            url: window.location.href,
            lang: lang,
          }),
        });
      } catch (e) {
        // Falha silenciosa para evitar loops
      }
    };

    reportError();
  }, [error, lang]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center animate-in fade-in duration-500">
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20">
        <span className="text-5xl animate-pulse">⚠️</span>
      </div>
      
      <h2 className="mb-4 text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
        {content.title}
      </h2>
      
      <p className="mb-10 max-w-md text-lg font-medium text-slate-500 dark:text-slate-400">
        {content.desc}
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          onClick={() => reset()}
          className="rounded-2xl bg-blue-600 px-10 py-4 font-black text-xs uppercase tracking-widest text-white transition-all hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20"
        >
          {content.retry}
        </button>
        
        <button
          onClick={() => window.location.href = `/${lang}`}
          className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-transparent px-10 py-4 font-black text-xs uppercase tracking-widest text-slate-600 dark:text-slate-400 transition-all hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
        >
          {content.home}
        </button>
      </div>

      {error.digest && (
        <div className="mt-12 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/50">
          <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
            Error ID: {error.digest}
          </p>
        </div>
      )}
    </div>
  );
}
