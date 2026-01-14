import { getDictionary, Locale } from "@/lib/i18n";
import { Briefcase, GraduationCap, Target, Award } from "lucide-react";

interface Props {
  locale: Locale;
}

export default function AboutSection({ locale }: Props) {
  const dict = getDictionary(locale);

  const htmlLangMap = {
    en: "en-US",
    es: "es-ES",
    pt: "pt-BR",
  };

  // Ícones mapeados para cada bloco de informação
  const sections = [
    {
      title: dict.sections.experienceTitle,
      content: [dict.experience.item1, dict.experience.item2, dict.experience.item3],
      icon: <Briefcase className="text-blue-600 dark:text-blue-400" size={24} />,
      isList: true
    },
    {
      title: dict.sections.reskillingTitle,
      content: dict.experience.reskilling,
      icon: <GraduationCap className="text-blue-600 dark:text-blue-400" size={24} />,
      isList: false
    },
    {
      title: dict.sections.differentialTitle,
      content: dict.experience.differential,
      icon: <Award className="text-blue-600 dark:text-blue-400" size={24} />,
      isList: false
    },
    {
      title: dict.sections.objectiveTitle,
      content: dict.experience.objective,
      icon: <Target className="text-blue-600 dark:text-blue-400" size={24} />,
      isList: false
    }
  ];

  return (
    <section
      id="about"
      role="region"
      aria-labelledby="about-title"
      lang={htmlLangMap[locale]}
      className="container mx-auto max-w-6xl px-6 lg:px-8 py-20 sm:py-32 space-y-16 transition-colors duration-300"
    >
      {/* Bloco de Introdução Narrativa */}
      <div className="max-w-4xl space-y-8">
        <div className="space-y-4">
          <h2
            id="about-title"
            className="font-black text-4xl md:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight"
          >
            {dict.sections.aboutTitle}
            <span className="block h-1.5 w-24 bg-blue-600 mt-4 rounded-full" />
          </h2>
        </div>

        <div className="space-y-6">
          <p className="text-xl md:text-3xl text-slate-800 dark:text-slate-100 leading-tight font-bold">
            {dict.sections.aboutIntro}
          </p>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            {dict.sections.aboutDetails}
          </p>
        </div>
      </div>

      {/* Grid de Informação Técnica - Formato Bento Box Sutil */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
        {sections.map((sec, index) => (
          <div 
            key={index} 
            className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50 hover:border-blue-500/30 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-sm group-hover:scale-110 transition-transform">
                {sec.icon}
              </div>
              <h3 className="font-black text-lg uppercase tracking-widest text-slate-900 dark:text-white">
                {sec.title}
              </h3>
            </div>

            {sec.isList && Array.isArray(sec.content) ? (
              <ul className="space-y-4">
                {sec.content.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 font-medium">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={`text-slate-600 dark:text-slate-400 leading-relaxed font-medium ${sec.title === dict.sections.objectiveTitle ? 'text-blue-600 dark:text-blue-400 font-bold' : ''}`}>
                {sec.content}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
