"use client";

import { useState } from "react";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-light dark:border-dark bg-surface-light dark:bg-surface-dark">
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold animate-textGradient"
          aria-label="Home"
        >
          Sergio Santos
        </Link>

        {/* Menu desktop */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/pt/projects" className="nav-link">
            Projetos
          </Link>
          <Link href="/pt/about" className="nav-link">
            Sobre
          </Link>
          <Link href="/pt/contact" className="nav-link">
            Contato
          </Link>
          <LanguageSwitcher />
        </nav>

        {/* Botão hamburguer (mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Abrir menu"
        >
          <svg
            className="h-6 w-6 text-gray-800 dark:text-gray-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Menu mobile dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-light dark:border-dark bg-surface-light dark:bg-surface-dark">
          <nav className="flex flex-col gap-4 p-4">
            <Link href="/pt/projects" className="nav-link">
              Projetos
            </Link>
            <Link href="/pt/about" className="nav-link">
              Sobre
            </Link>
            <Link href="/pt/contact" className="nav-link">
              Contato
            </Link>
            <LanguageSwitcher />
          </nav>
        </div>
      )}
    </header>
  );
}
