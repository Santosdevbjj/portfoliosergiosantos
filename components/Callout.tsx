"use client";

import { ReactNode, useState } from "react";

interface CalloutProps {
  children: ReactNode;
  type?: "info" | "warning" | "success";
  lang?: "pt" | "en" | "es"; // idioma para labels
}

export default function Callout({ children, type = "info", lang = "pt" }: CalloutProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

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

  const labels = {
    pt: { info: "Informação", warning: "Atenção", success: "Sucesso", close: "Fechar" },
    en: { info: "Info", warning: "Warning", success: "Success", close: "Close" },
    es: { info: "Información", warning: "Atención", success: "Éxito", close: "Cerrar" },
  };

  return (
    <div
      className={`rounded-md border-l-4 p-4 my-4 flex items-start gap-3 ${styles[type]} prose-sm`}
      role="note"
    >
      <span className="text-xl">{icons[type]}</span>
      <div className="flex-1">
        <p className="font-semibold mb-1">{labels[lang][type]}</p>
        <div>{children}</div>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="ml-2 text-sm px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        aria-label={labels[lang].close}
      >
        ✖
      </button>
    </div>
  );
}
