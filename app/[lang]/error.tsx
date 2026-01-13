"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 📊 Envio do erro para o Logtail
    const logErrorToService = async () => {
      if (!process.env.NEXT_PUBLIC_LOGTAIL_TOKEN) return;

      try {
        await fetch("https://in.logtail.com/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_LOGTAIL_TOKEN}`,
          },
          body: JSON.stringify({
            level: "error",
            service: "portfolio-frontend",
            message: error.message || "Erro de renderização no cliente",
            stack: error.stack,
            digest: error.digest, // ID único do erro gerado pelo Next.js
            url: window.location.href,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (e) {
        console.error("Falha ao reportar erro para o Logtail", e);
      }
    };

    logErrorToService();
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
        Ops! Algo deu errado.
      </h2>
      <p className="mb-8 text-slate-600 dark:text-slate-400">
        O erro foi reportado automaticamente para nossa equipe de engenharia.
      </p>
      <button
        onClick={() => reset()}
        className="rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700"
      >
        Tentar novamente
      </button>
    </div>
  );
}
