// tailwind.config.js
import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Кастомные цвета
        black: {
          DEFAULT: '#0D0D0D', // Основной черный
        },
        purple: {
          DEFAULT: '#6C3F99', // Основной фиолетовый
          light: '#CC73EC', // Светлый фиолетовый
          lightOpacity: 'rgba(204, 115, 236, 0.4)', // Светлый фиолетовый с прозрачностью 40%
        },
        pink: {
          DEFAULT: '#BE1B86', // Основной розовый
        },
        gray: {
          DEFAULT: '#6C6B6D', // Основной серый
        },
        white: {
          DEFAULT: '#FFFFFF', // Белый
        },
      },
      fontFamily: {
        // Настройка шрифта Open Sans
        sans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;