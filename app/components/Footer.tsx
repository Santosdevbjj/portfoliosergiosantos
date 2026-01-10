"use client";

import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Translations } from "@/lib/i18n";

interface FooterProps {
  dict: Translations["navigation"] & Translations["footer"];
  lang: "pt" | "en" | "es";
}

export default function Footer({ dict, lang }: FooterProps) {
  return (
    <footer
      className="w-full border-t border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Logo / Nome */}
          <div className="flex items-center space-x-2">
            <Link href={`/${lang}`} className="flex items-center">
              <span className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-gray-100">
                Sergio Santos
              </span>
            </Link>
          </div>

          {/* Navegação secundária */}
          <nav className="flex flex-wrap justify-center gap-x-6" aria-label="Footer navigation">
            <Link href={`/${lang}`} className="nav-link">
              {dict.home}
            </Link>
            <Link href={`/${lang}/about`} className="nav-link">
              {dict.about}
            </Link>
            <Link href={`/${lang}/projects`} className="nav-link">
              {dict.projects}
            </Link>
            <Link href={`/${lang}/contact`} className="nav-link">
              {dict.contact}
            </Link>
          </nav>

          {/* Ações à direita */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher lang={lang} dict={dict} />

            {/* Links sociais */}
            <div className="flex flex-wrap gap-x-3">
              <a
                href="https://github.com/seuusuario"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
              >
                {/* Ícone GitHub */}
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path /* ... */ />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/seuusuario"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
              >
                {/* Ícone LinkedIn */}
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path /* ... */ />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Sergio Santos. {dict.rights}
        </div>
      </div>
    </footer>
  );
}
