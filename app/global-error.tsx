"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const reportedRef = useRef(false);

  useEffect(() => {
    // Evita múltiplos envios do mesmo erro
    if (reportedRef.current) return;
    reportedRef.current = true;

    console.error("🚨 Critical Global Error:", error);

    const report = async () => {
      try {
        await fetch("/api/log", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            level: "fatal",
            message: error.message || "Global Runtime Crash",
            digest: error.digest,
            stack: error.stack?.substring(0, 500),
            source: "global-error-boundary",
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch {
        // Falha silenciosa — não bloquear UX
      }
    };

    report();
  }, [error]);

  const language = typeof navigator !== "undefined"
    ? navigator.language.startsWith("pt")
      ? "pt"
      : navigator.language.startsWith("es")
        ? "es"
        : "en"
    : "en";

  const texts = {
    pt: {
      title: "Erro Crítico do Sistema",
      description:
        "Ocorreu uma falha inesperada no núcleo da aplicação. O incidente foi registrado para análise técnica.",
      retry: "Reiniciar Aplicação",
      home: "Voltar para Home",
    },
    en: {
      title: "Critical System Error",
      description:
        "An unexpected failure occurred in the application core. The incident has been logged for technical analysis.",
      retry: "Restart Application",
      home: "Back to Home",
    },
    es: {
      title: "Error Crítico del Sistema",
      description:
        "Se produjo una falla inesperada en el núcleo de la aplicación. El incidente fue registrado para análisis técnico.",
      retry: "Reiniciar Aplicación",
      home: "Volver al Inicio",
    },
  };

  const t = texts[language];

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-950 p-6 text-center text-slate-50 antialiased">
      {/* Ícone */}
      <div className="mb-8 rounded-3xl bg-red-500/10 p-6 border border-red-500/20 shadow-2xl shadow-red-500/5">
        <AlertTriangle className="h-16 w-16 text-red-500" />
      </div>

      <h1 className="mb-6 text-4xl md:text-6xl font-black tracking-tighter leading-none">
        {t.title}
      </h1>

      <p className="mb-10 max-w-md text-lg md:text-xl leading-relaxed font-medium text-slate-400">
        {t.description}
      </p>

      <div className="flex w-full max-w-xs flex-col gap-4 sm:max-w-none sm:flex-row justify-center">
        <button
          onClick={reset}
          className="flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-10 py-4 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20"
        >
          <RefreshCcw className="h-4 w-4" />
          {t.retry}
        </button>

        <button
          onClick={() => location.assign("/")}
          className="flex items-center justify-center gap-3 rounded-2xl bg-slate-800 px-10 py-4 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-slate-700 hover:scale-105 active:scale-95"
        >
          <Home className="h-4 w-4" />
          {t.home}
        </button>
      </div>

      {error.digest && (
        <div className="mt-16 rounded-xl bg-slate-900/50 border border-slate-800 p-4">
          <code className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">
            Incident ID: {error.digest}
          </code>
        </div>
      )}

      <footer className="mt-20 text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">
        Sérgio Santos • Infrastructure Integrity
      </footer>
    </div>
  );
}
