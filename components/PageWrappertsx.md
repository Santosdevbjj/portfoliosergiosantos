'use client';

import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function PageWrapper({ children }: Props) {
  return (
    <div
      className="min-h-screen"
      onLoad={() => {
        console.log('Página carregada');
      }}
    >
      {children}
    </div>
  );
}
