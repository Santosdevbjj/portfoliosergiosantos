"use client";

export default function ThemeToggle() {
  function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains("dark");

    if (isDark) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-xl"
      aria-label="Toggle Dark Mode"
    >
      🌙 / ☀️
    </button>
  );
}
