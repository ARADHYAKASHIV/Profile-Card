/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        surface: {
          dark: '#07080B',
          darkCard: 'rgba(16, 18, 25, 0.72)',
          light: '#F3F4F6',
          lightCard: 'rgba(255, 255, 255, 0.88)',
        }
      }
    },
  },
  plugins: [],
}
