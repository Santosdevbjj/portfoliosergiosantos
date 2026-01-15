"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";

import LanguageSwitcher from "./LanguageSwitcher";
import DarkModeToggle from "./DarkModeToggle";
import type { Locale, Dictionary } from "@/lib/i18n";

interface Props {
  lang: Locale;
  dict: Dictionary;
}

export default function Navbar({ lang, dict }: Props) {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /** Scroll effect (header compacto) */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** Fecha menu ao trocar rota */
  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "unset";
  }, [pathname]);

  /** Controla scroll do body */
  const toggleMenu = () => {
    setIsMobileMenuOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? "hidden" : "unset";
      return next;
    });
  };

  const isHome =
    pathname === `/${lang}` || pathname === `/${lang}/`;

  const navLinks = [
    {
      label: dict.sections.about,
      href: `/${lang}`,
      active: isHome,
    },
    {
      label: dict.sections.featuredProjects,
      href: isHome
        ? "#featuredProjects"
        : `/${lang}#featuredProjects`,
    },
    {
      label: dict.sections.awards,
      href: isHome ? "#awards" : `/${lang}#awards`,
    },
  ];

  return (
    <nav
      role="navigation"
      aria-label="Primary Navigation"
      className={`
        fixed top-0 z-[100] w-full
        transition-all duration-500 ease-in-out
        ${
          isScrolled
            ? "py-3 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-lg"
            : "py-6 bg-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* BRAND */}
          <Link
            href={`/${lang}`}
            className="flex flex-col group focus:outline-none focus-visible:ring-2 ring-blue-500 rounded-md"
          >
            <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">
              SÉRGIO{" "}
              <span className="text-blue-600 group-hover:text-blue-500 transition-colors">
                SANTOS
              </span>
            </span>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
              {dict.categories.database}
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                aria-current={link.active ? "page" : undefined}
                className={`
                  text-[11px] font-black uppercase tracking-[0.2em]
                  transition-colors
                  ${
                    link.active
                      ? "text-blue-600"
                      : "text-slate-500 dark:text-slate-400 hover:text-blue-600"
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4 border-r border-slate-200 dark:border-slate-800 pr-4">
              <DarkModeToggle dict={dict.theme} />
              <LanguageSwitcher lang={lang} />
            </div>

            {/* MOBILE BUTTON */}
            <button
              onClick={toggleMenu}
              aria-label={
                isMobileMenuOpen
                  ? dict.common.closeMenu
                  : dict.common.openMenu
              }
              aria-expanded={isMobileMenuOpen}
              className="
                md:hidden p-2.5 rounded-2xl
                bg-slate-100 dark:bg-slate-900
                text-slate-600 dark:text-slate-300
                active:scale-90 transition-all
                focus:outline-none focus-visible:ring-2 ring-blue-500
              "
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="
            fixed inset-0 top-[72px]
            z-[99] md:hidden
            bg-white dark:bg-slate-950
            p-6 overflow-y-auto
            animate-in fade-in zoom-in-95 duration-200
          "
        >
          <div className="space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={toggleMenu}
                className="
                  flex items-center justify-between
                  text-2xl font-black
                  text-slate-900 dark:text-white
                  border-b border-slate-100 dark:border-slate-900 pb-4
                "
              >
                {link.label}
                <ChevronRight className="text-blue-600" />
              </Link>
            ))}

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                  {dict.theme.themeSystem}
                </p>
                <DarkModeToggle dict={dict.theme} />
              </div>

              <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                  {dict.common.language}
                </p>
                <LanguageSwitcher lang={lang} />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
