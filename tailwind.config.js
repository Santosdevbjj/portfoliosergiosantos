/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}', // Adicionado para garantir que hooks que usam classes funcionem
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px',
        ...defaultTheme.screens,
      },
      fontFamily: {
        // Prioriza a variável do next/font injetada no layout
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono], // Ideal para engenharia de dados
      },
      colors: {
        // Cores semânticas alinhadas com o que construímos nos componentes
        brand: {
          50: '#f0f4ff',
          100: '#e1e9ff',
          500: '#3b82f6', // Primary Blue
          600: '#2563eb',
          700: '#1d4ed8',
        },
        // Superfícies para facilitar o uso em Cards e Modais
        surface: {
          light: '#ffffff',
          dark: '#020617', // Slate-950
          card: {
            light: '#f8fafc', // Slate-50
            dark: '#0f172a',  // Slate-900
          }
        },
      },
      keyframes: {
        fadeIn: { 
          '0%': { opacity: '0' }, 
          '100%': { opacity: '1' } 
        },
        slideUp: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        gradientMove: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        slideUp: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'text-gradient': 'gradientMove 6s ease infinite',
      },
      typography: (theme) => ({
        // Tema customizado para seus artigos técnicos de dados
        DEFAULT: {
          css: {
            maxWidth: '75ch', // Melhor para legibilidade de texto longo
            '--tw-prose-headings': theme('colors.slate.900'),
            '--tw-prose-links': theme('colors.brand.600'),
            '--tw-prose-bold': theme('colors.slate.900'),
            '--tw-prose-code': theme('colors.brand.700'),
          },
        },
        invert: { // Tema dark nativo do plugin typography
          css: {
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-links': theme('colors.brand.500'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-code': theme('colors.brand.400'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
    require('tailwindcss-animate'), // Suporte para as classes animate-in do menu mobile
  ],
};
