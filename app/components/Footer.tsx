'use client';

import { Dictionary } from '@/lib/i18n';

interface Props {
  dict: Dictionary;   // dicionário multilíngue carregado dinamicamente
  lang: 'pt' | 'en';  // idioma atual
}

export default function Footer({ dict, lang }: Props) {
  return (
    <footer
      lang={lang === 'en' ? 'en-US' : 'pt-BR'}
      aria-label={lang === 'en' ? 'Site footer' : 'Rodapé do site'}
      className="w-full bg-gray-100 dark:bg-gray-900 shadow-inner transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center 
                      px-4 py-6 sm:py-8 gap-4 sm:gap-0 lg:px-8 text-center sm:text-left">
        
        {/* Texto de direitos autorais */}
        <span className="text-[clamp(0.75rem,1vw,0.875rem)] text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Sérgio Santos — {lang === 'en' ? dict.footer?.rights ?? 'All rights reserved.' : dict.footer?.rights ?? 'Todos os direitos reservados.'}
        </span>

        {/* Links adicionais */}
        <div className="flex flex-wrap justify-center sm:justify-end gap-4 text-[clamp(0.75rem,1vw,0.875rem)]">
          <a
            href="https://github.com/sergiosantos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/santossergioluiz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
          >
            LinkedIn
          </a>
          <a
            href="mailto:sergio.santos@email.com"
            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
          >
            {lang === 'en' ? dict.footer?.contact ?? 'Contact' : dict.footer?.contact ?? 'Contato'}
          </a>
        </div>
      </div>
    </footer>
  );
}
