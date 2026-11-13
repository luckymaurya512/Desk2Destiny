/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#1B4332',
          deep: '#1B4332',
          dark: '#143125',
          light: '#2D6A4F',
          muted: '#40916C',
        },
        terracotta: {
          DEFAULT: '#C85A32',
          warm: '#C85A32',
          light: '#D9734D',
          dark: '#A64320',
          soft: '#F4E3DC',
        },
        sand: {
          DEFAULT: '#F5F0E6',
          beige: '#F5F0E6',
          light: '#FAF7F2',
          muted: '#E8E1D3',
          dark: '#D5CBBB',
        },
        charcoal: {
          DEFAULT: '#1F2933',
          dark: '#141B22',
          light: '#323F4B',
          muted: '#52606D',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

