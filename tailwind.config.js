/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class', // ativa dark mode via classe
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      /* Breakpoints extras para maior controle responsivo */
      screens: {
        xs: '480px', // breakpoint adicional para telas muito pequenas
        ...defaultTheme.screens,
      },

      /* Tipografia */
      fontFamily: {
        inter: ['"Inter Variable"', 'Inter', 'sans-serif'],
      },

      /* Paleta de cores personalizada */
      colors: {
        primary: { light: '#7f5af0', DEFAULT: '#7f5af0', dark: '#5a3db1' },
        accent: { light: '#f0a500', DEFAULT: '#f0a500', dark: '#b18300' },
        secondary: { light: '#ff61dc', DEFAULT: '#ff61dc', dark: '#b03f99' },
      },

      /* Gradientes adicionais */
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      /* Animações personalizadas */
      keyframes: {
        textGradient: {
          '0%,100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        gradientBG: {
          '0%,100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      animation: {
        textGradient: 'textGradient 5s ease infinite',
        gradientBG: 'gradientBG 15s ease infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),       // estilização de formulários
    require('@tailwindcss/typography'),  // tipografia avançada
    require('@tailwindcss/aspect-ratio'),// controle responsivo de proporções
    require('@tailwindcss/line-clamp'),  // acessibilidade: truncamento de textos
  ],
};
