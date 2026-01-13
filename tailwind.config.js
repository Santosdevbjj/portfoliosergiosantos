/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './dictionaries/**/*.json',
  ],
  // Removida a regex agressiva do safelist para otimizar o bundle
  safelist: [
    'prose',
    'prose-technical',
    'dark:prose-darkTechnical',
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px',
        ...defaultTheme.screens,
      },
      fontFamily: {
        inter: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        noto: ['Noto Sans', 'sans-serif'],
      },
      colors: {
        primary: { light: '#7f5af0', DEFAULT: '#7f5af0', dark: '#5a3db1' },
        accent: { light: '#f0a500', DEFAULT: '#f0a500', dark: '#b18300' },
        secondary: { light: '#ff61dc', DEFAULT: '#ff61dc', dark: '#b03f99' },
        brand: { light: '#6366f1', DEFAULT: '#4f46e5', dark: '#3730a3' },
        surface: {
          light: '#ffffff',
          dark: '#0f172a',
        },
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        gradientMove: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease-in-out',
        slideUp: 'slideUp 0.4s ease-out',
        'text-gradient': 'gradientMove 5s ease infinite',
      },
      backgroundSize: {
        '300%': '300% 300%',
      },
      // Configuração de Tipografia para MDX e textos longos
      typography: (theme) => ({
        technical: {
          css: {
            '--tw-prose-links': theme('colors.primary.DEFAULT'),
            color: theme('colors.slate.700'),
            maxWidth: 'none',
            code: {
              backgroundColor: theme('colors.slate.100'),
              padding: '2px 4px',
              borderRadius: '4px',
              fontWeight: '400',
            },
          },
        },
        darkTechnical: {
          css: {
            color: theme('colors.slate.300'),
            '--tw-prose-links': theme('colors.blue.400'),
            '--tw-prose-headings': theme('colors.white'),
            code: {
              backgroundColor: theme('colors.slate.800'),
              color: theme('colors.pink.400'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    require('tailwindcss-animate'),
  ],
};
