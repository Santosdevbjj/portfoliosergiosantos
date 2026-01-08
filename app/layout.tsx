import "./globals.css";
import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors"
        onLoad={() => {
          if (typeof window !== "undefined") {
            const theme = localStorage.getItem("theme");
            if (theme === "dark") {
              document.documentElement.classList.add("dark");
            }
          }
        }}
      >
        <Header />
        <div className="flex justify-end px-4">
          <ThemeToggle />
        </div>
        <main className="px-4 py-6">{children}</main>
        <footer className="text-center text-sm p-4">
          © {new Date().getFullYear()} Sérgio Santos
        </footer>
      </body>
    </html>
  );
}
