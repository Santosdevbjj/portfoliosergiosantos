"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const LANGS = [
  { code: "pt", label: "Português" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

export default function LanguageSwitcher() {
  const pathname = usePathname();

  if (!pathname) return null;

  // Exemplo: /pt/projects/arquivo → ["", "pt", "projects", "arquivo"]
  const segments = pathname.split("/");
  const currentLang = segments[1];
  const restPath = segments.slice(2).join("/");

  return (
    <nav aria-label="Language switcher" className="flex gap-2">
      {LANGS.map((lang) => (
        <Link
          key={lang.code}
          href={`/${lang.code}/${restPath}`}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200
            ${
              currentLang === lang.code
                ? "bg-primary text-white"
                : "bg-surface-light dark:bg-surface-dark text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white"
            }`}
        >
          {lang.label}
        </Link>
      ))}
    </nav>
  );
}
