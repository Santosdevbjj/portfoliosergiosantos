import "./globals.css";

export const metadata = {
  title: "Portfólio | Sérgio Santos",
  description: "Portfólio profissional de Engenharia de Dados",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
