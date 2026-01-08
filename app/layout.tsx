import "./globals.css";
import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
        <Header />
        <div className="px-4 py-6">{children}</div>
        <footer className="text-center text-sm p-4">
          © {new Date().getFullYear()} Sérgio Santos
        </footer>
      </body>
    </html>
  );
}
