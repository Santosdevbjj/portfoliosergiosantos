"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-950 text-white">
          <h1 className="text-2xl font-bold">Erro Crítico de Sistema</h1>
          <button onClick={() => reset()} className="mt-4 underline">
            Recarregar aplicação
          </button>
        </div>
      </body>
    </html>
  );
}
