"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();

  // Função auxiliar para evitar repetição de lógica
  const getLinkStyle = (lang: string) => 
    `px-3 py-2 rounded-md transition-colors ${
      path.startsWith(lang) 
        ? "font-bold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200" 
        : "hover:bg-gray-200 dark:hover:bg-gray-700"
    }`;

  return (
    <header className="p-4 bg-gray-100 dark:bg-gray-800 shadow-sm">
      <nav className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex space-x-2">
          <Link href="/pt" className={getLinkStyle("/pt")}>
            Português
          </Link>
          <Link href="/en" className={getLinkStyle("/en")}>
            English
          </Link>
        </div>
        
        {/* Adicionando um indicador visual de qual versão está ativa */}
        <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">
          {path.startsWith("/en") ? "International" : "Brasil"}
        </span>
      </nav>
    </header>
  );
}
