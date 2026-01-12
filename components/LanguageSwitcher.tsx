"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();

  const languages = [
    { code: "pt", label: "PT", flag: "🇧🇷" },
    { code: "en", label: "EN", flag: "🇺🇸" },
    { code: "es", label: "ES", flag: "🇪🇸" },
  ];

  const getTransformedPathname = (newLocale: string) => {
    if (!pathname) return `/${newLocale}`;
    const segments = pathname.split("/");
    if (segments.length > 1 && languages.some(l => l.code === segments[1])) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    return segments.join("/");
  };

  return (
    <nav aria-label="Seletor de idioma">
      <ul className="flex items-center gap-2">
        {languages.map(({ code, label, flag }) => {
          const isActive = pathname?.startsWith(`/${code}`);

          return (
            <li key={code}>
              <Link
                href={getTransformedPathname(code)}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-sm font-semibold transition-all
                  ${isActive 
                    ? "bg-primary text-white shadow-sm" 
                    : "text-gray-600 dark:text-gray-400 hover:bg-primary/80 hover:text-white"
                  }`}
              >
                <span>{flag}</span>
                <span className="hidden sm:inline">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
