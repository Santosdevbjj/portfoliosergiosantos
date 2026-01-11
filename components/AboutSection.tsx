"use client";

import { getDictionary, DEFAULT_LOCALE, Locale } from "@/lib/i18n";

interface Props {
  locale?: Locale;
}

export default function AboutSection({ locale = DEFAULT_LOCALE }: Props) {
  const dict = getDictionary(locale);

  return (
    <section
      id="about"
      role="region"
      aria-labelledby="about-title"
      lang={locale === "en" ? "en-US" : locale === "es" ? "es-ES" : "pt-BR"}
      className="container mx-auto max-w-5xl px-4 lg:px-8 py-10 sm:py-16 space-y-6 sm:space-y-8 bg-surface-light dark:bg-surface-dark transition-colors duration-300"
    >
      {/* Título multilíngue */}
      <h2
        id="about-title"
        className="font-bold text-[clamp(1.75rem,3vw+1rem,2.5rem)] text-gray-900 dark:text-gray-100"
      >
        {dict.sections.aboutTitle}
      </h2>

      {/* Introdução */}
      <p className="text-[clamp(1rem,2.5vw,1.25rem)] text-gray-700 dark:text-gray-300 leading-relaxed">
        {dict.sections.aboutIntro}
      </p>

      {/* Detalhes */}
      <p className="text-[clamp(0.875rem,2vw,1rem)] text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
        {dict.sections.aboutDetails}
      </p>

      {/* Sub-seções */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div>
          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-2">
            {dict.sections.experienceTitle}
          </h3>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
            <li>{dict.experience.item1}</li>
            <li>{dict.experience.item2}</li>
            <li>{dict.experience.item3}</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-2">
            {dict.sections.reskillingTitle}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {dict.experience.reskilling}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div>
          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-2">
            {dict.sections.differentialTitle}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {dict.experience.differential}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-2">
            {dict.sections.objectiveTitle}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {dict.experience.objective}
          </p>
        </div>
      </div>
    </section>
  );
}
