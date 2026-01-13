import "@/app/globals.css";
import { Inter } from "next/font/google";
import { Locale, i18n } from "@/lib/i18n";
import { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

/** 📱 Configuração de Viewport (Padrão Next.js 15) */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

/** 🔎 SEO Dinâmico e Internacionalização (Hreflang) */
export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  
  const content = {
    pt: {
      title: "Sérgio Santos | Especialista em Dados e Software",
      description: "Portfólio profissional de Engenharia de Dados, IA e desenvolvimento de sistemas robustos.",
    },
    es: {
      title: "Sérgio Santos | Especialista en Datos y Software",
      description: "Portafolio profesional de Ingeniería de Datos, IA y desarrollo de sistemas robustos.",
    },
    en: {
      title: "Sérgio Santos | Data & Software Specialist",
      description: "Professional portfolio of Data Engineering, AI, and robust software development.",
    }
  };

  const current = content[lang] || content.en;
  const baseUrl = "https://portfoliosergiosantos.vercel.app";

  return {
    title: {
      default: current.title,
      template: `%s | Sérgio Santos`
    },
    description: current.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${lang}`,
      languages: {
        "pt-BR": "/pt",
        "en-US": "/en",
        "es-ES": "/es",
      },
    },
    openGraph: {
      type: "website",
      locale: lang === "pt" ? "pt_BR" : lang === "es" ? "es_ES" : "en_US",
      url: `${baseUrl}/${lang}`,
      title: current.title,
      description: current.description,
      siteName: "Sérgio Santos Portfolio",
      images: [
        {
          url: `/og-image-${lang}.png`,
          width: 1200,
          height: 630,
          alt: current.title,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/** 🚀 Geração de Caminhos Estáticos para os Idiomas */
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

/** 🏗️ Estrutura Raiz do Layout */
export default async function RootLayout({ children, params }: Props) {
  // No Next.js 15, params precisa ser aguardado (await)
  const { lang } = await params;

  return (
    <html lang={lang} className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 antialiased min-h-screen flex flex-col`}
      >
        {/* O conteúdo das páginas (Navbar, Main, Footer) é renderizado aqui */}
        {children}

        {/* 📊 Google Analytics 4 (Carregamento Otimizado) 
            Certifique-se de configurar NEXT_PUBLIC_GA_ID no seu .env ou Vercel */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
