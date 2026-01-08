import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Sérgio Santos | Data Scientist",
  description: "Data Science, Engenharia de Dados e Governança"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
