// app/layout.tsx
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={inter.variable}
    >
      {/* 
        Script crítico para definir o tema ANTES da renderização.
        Não depende de idioma e evita FOUC.
      */}
      <Script
        id="theme-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function () {
              try {
                const savedTheme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const theme = savedTheme || (prefersDark ? 'dark' : 'light');

                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.style.colorScheme = 'light';
                }
              } catch (_) {}
            })();
          `,
        }}
      />

      <body
        className="
          font-sans
          antialiased
          bg-white
          text-slate-900
          dark:bg-slate-950
          dark:text-slate-100
          transition-colors
          duration-300
        "
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {children}
      </body>
    </html>
  );
}
