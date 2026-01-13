// app/layout.tsx
import { ReactNode } from "react";

/**
 * Este é o Root Layout global. 
 * Ele deve ser simples porque a lógica real de idiomas, 
 * fontes e SEO está em app/[lang]/layout.tsx
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
