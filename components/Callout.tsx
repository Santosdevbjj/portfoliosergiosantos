"use client";

import { ReactNode } from "react";

interface CalloutProps {
  children: ReactNode;
  type?: "info" | "warning" | "success";
  lang?: "pt" | "en" | "es"; // opcional para mensagens multilíngues
}

export default function Callout({ children, type = "info", lang = "pt" }: CalloutProps) {
  const styles = {
    info: "border-blue-400 bg-blue-50 text-blue-800 dark:border-blue-500 dark:bg-blue-900/30 dark:text-blue-200",
    warning: "border-yellow-400 bg-yellow-50 text-yellow-800 dark:border-yellow-500 dark:bg-yellow-900/30 dark:text-yellow-200",
    success: "border-green-400 bg-green-50 text-green-800 dark:border-green-500 dark:bg-green-900/30 dark:text-green-200",
  };

  const icons = {
    info: "ℹ️",
    warning: "⚠️",
    success: "✅",
  };

  // Labels multilíngues opcionais (se quiser prefixar automaticamente)
  const labels = {
    pt: { info: "Informação", warning: "Atenção", success: "Sucesso" },
    en: { info: "Info", warning: "Warning", success: "Success" },
    es: { info: "Información", warning: "Atención", success: "Éxito" },
  };

  return (
    <div
      className={`rounded-md border-l-4 p-4 my-4 flex items-start gap-3 ${styles[type]} prose-sm`}
      role="note"
    >
      <span className="text-xl">{icons[type]}</span>
      <div>
        <p className="font-semibold mb-1">{labels[lang][type]}</p>
        <div>{children}</div>
      </div>
    </div>
  );
}
