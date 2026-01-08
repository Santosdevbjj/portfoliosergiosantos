'use client'; // garante interatividade

import { ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
}

export default function PageWrapper({ children }: Props) {
  useEffect(() => {
    console.log('Página carregada');
  }, []);

  return <div className="min-h-screen transition-colors duration-500">{children}</div>;
}
