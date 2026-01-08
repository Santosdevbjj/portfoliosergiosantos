// app/page.tsx
import { getDictionary } from "@/lib/i18n";
import { usePathname } from "next/navigation";

export default async function Home() {
  // Detecta idioma pela rota
  const pathname = usePathname() ?? "";
  const locale = pathname.startsWith("/en") ? "en" : "pt";

  // Carrega dicionário correspondente
  const dict = await getDictionary(locale);

  return (
    <section
      role="main"
      aria-label={locale === "en" ? "Main presentation" : "Apresentação inicial"}
      lang={locale === "en" ? "en-US" : "pt-BR"}
      className="max-w-4xl mx-auto text-center py-10 sm:py-16 space-y-4 sm:space-y-6"
    >
      {/* Título multilíngue */}
      <h1 className="font-bold text-[clamp(2rem,4vw+1rem,4rem)]">
        🚀 Sérgio Santos
      </h1>

      {/* Descrição multilíngue do portfólio */}
      <p className="text-[clamp(1rem,2.5vw,1.25rem)] text-gray-600 dark:text-gray-300">
        {dict.portfolio.title}
      </p>

      <p className="text-[clamp(0.875rem,2vw,1rem)] text-gray-500 dark:text-gray-400">
        {dict.portfolio.description}
      </p>
    </section>
  );
}
