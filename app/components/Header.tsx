"use client";

import Link from "next/link";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import DarkModeToggle from "./DarkModeToggle";
import type { Translations } from "@/lib/i18n";

interface HeaderProps {
  dict: Translations["navigation"]; // ✅ tipagem consistente
  lang: "pt" | "en" | "es"; // ✅ inclui espanhol
}

export default function Header({ dict, lang }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="w-full border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700"
      aria-label="Site header"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo / Nome */}
        <div className="flex items-center space-x-2">
          <Link href={`/${lang}`} className="flex items-center">
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Sergio Santos
            </span>
          </Link>
        </div>

        {/* Navegação principal (desktop) */}
        <nav className="hidden md:flex space-x-6" aria-label="Main navigation">
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
          <DarkModeToggle lang={lang} />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-900 dark:text-gray-100 focus:outline-none"
            aria-label="Menu"
            aria-expanded={menuOpen} // ✅ acessibilidade
          >
            ☰
          </button>
        </div>
      </div>

      {/* Navegação mobile */}
      {menuOpen && (
        <div className="md:hidden flex justify-center border-t border-gray-200 dark:border-gray-700 py-2">
          <nav className="flex flex-col space-y-2 text-center" aria-label="Mobile navigation">
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
        </div>
      )}
    </header>
  );
}

// ✅ Sugestão: criar uma classe utilitária "nav-link" no Tailwind para evitar repetição:
// .nav-link { @apply text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400; }
