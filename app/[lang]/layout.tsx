// app/[lang]/layout.tsx
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { GoogleAnalytics } from "@next/third-parties/google";

import { i18n, type Locale, getDictionary } from "@/lib/i18n";
import { ThemeProvider } from "@/hooks/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

interface Props {
  children: ReactNode;
  params: Promise<{ lang: Locale }>;
}

/**
 * SEO DINÂMICO INTERNACIONAL — Layout por idioma
 */
export async function generateMetadata(
  { params }: { params: Promise<{ lang: Locale }> }
): Promise<Metadata> {
  const { lang } = await params;

  if (!i18n.locales.includes(lang)) {
    return {};
  }

  const t = await getDictionary(lang);
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://portfoliosergiosantos.vercel.app";

  return {
    title: {
      default: t.portfolio.title,
      template: `%s | Sérgio Santos`,
    },
    description: t.portfolio.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        pt: `${baseUrl}/pt`,
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
        "x-default": `${baseUrl}/en`,
      },
    },
    openGraph: {
      type: "website",
      locale:
        lang === "pt"
          ? "pt_BR"
          : lang === "es"
          ? "es_ES"
          : "en_US",
      url: `${baseUrl}/${lang}`,
      title: t.portfolio.title,
      description: t.portfolio.description,
      siteName: "Sérgio Santos Portfolio",
      images: [
        {
          url: `/og-image-${lang}.png`,
          width: 1200,
          height: 630,
          alt: t.portfolio.title,
        },
      ],
    },
  };
}

/**
 * Layout por idioma (sem <html> e <body>)
 */
export default async function LanguageLayout({
  children,
  params,
}: Props) {
  const { lang } = await params;

  if (!i18n.locales.includes(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
        <Navbar lang={lang} dict={dict} />

        <main className="flex-grow">
          {children}
        </main>

        <Footer dict={dict} />

        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </div>
    </ThemeProvider>
  );
}
