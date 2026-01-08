'use client';

import { ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
  lang?: 'pt' | 'en'; // idioma atual opcional
}

export default function PageWrapper({ children, lang = 'pt' }: Props) {
  useEffect(() => {
    console.log('Página carregada');
  }, []);

  return (
    <main
      role="main"
      lang={lang === 'en' ? 'en-US' : 'pt-BR'}
      aria-label={lang === 'en' ? 'Main content' : 'Conteúdo principal'}
      className="min-h-screen flex flex-col transition-colors duration-500 
                 px-4 sm:px-6 lg:px-8 
                 bg-gray-50 dark:bg-gray-900"
    >
      {children}
    </main>
  );
}
