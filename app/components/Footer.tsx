"use client";

import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Lang } from "@/lib/i18n/config";

interface FooterProps {
  dict: {
    home: string;
    about: string;
    projects: string;
    contact: string;
    language: string;
    rights: string; // ex.: "Todos os direitos reservados" / "All rights reserved"
  };
  lang: Lang;
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
              <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Sergio Santos
              </span>
            </Link>
          </div>

          {/* Navegação secundária */}
          <nav className="flex flex-wrap justify-center space-x-6">
            <Link
              href={`/${lang}`}
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
            >
              {dict.home}
            </Link>
            <Link
              href={`/${lang}/about`}
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
            >
              {dict.about}
            </Link>
            <Link
              href={`/${lang}/projects`}
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
            >
              {dict.projects}
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
            >
              {dict.contact}
            </Link>
          </nav>

          {/* Ações à direita (Language Switcher + redes sociais) */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher lang={lang} dict={dict} />

            {/* Links sociais */}
            <div className="flex space-x-3">
              <a
                href="https://github.com/seuusuario"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
              >
                <span className="sr-only">GitHub</span>
                {/* Ícone GitHub */}
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.438 9.8 8.205 11.385.6.111.82-.261.82-.58
                    0-.287-.011-1.244-.017-2.255-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.73.083-.73
                    1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.76-1.605-2.665-.304-5.466-1.333-5.466-5.931
                    0-1.31.468-2.381 1.236-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.018.005
                    2.043.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221
                    0 4.61-2.805 5.624-5.476 5.921.43.372.814 1.102.814 2.222 0 1.606-.015 2.898-.015 3.293 0 .321.218.694.825.576C20.565
                    21.796 24 17.307 24 12c0-6.63-5.37-12-12-12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/seuusuario"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
              >
                <span className="sr-only">LinkedIn</span>
                {/* Ícone LinkedIn */}
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 
                  5v14c0 2.76 2.24 5 5 5h14c2.76 
                  0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 
                  19h-3v-10h3v10zm-1.5-11.29c-.96 
                  0-1.75-.79-1.75-1.75s.79-1.75 
                  1.75-1.75 1.75.79 1.75 1.75-.79 
                  1.75-1.75 1.75zm13.5 11.29h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 
                  0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.37h.04c.4-.76 
                  1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.6z"/>
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
