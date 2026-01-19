/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'njoy-green': '#8BC34A',
        'njoy-dark': '#2E2E2E',
        'marle-gold': {
          50: '#fefdf8',
          100: '#fdf9e7',
          200: '#faf0c4',
          300: '#f6e195',
          400: '#f0cc5f',
          500: '#e8b339',
          600: '#d4971f',
          700: '#b17818',
          800: '#8f5f1a',
          900: '#754e1b',
        },
      },
      fontFamily: {
        'sans': ['Arial', 'sans-serif'],
        'castoro': ['Castoro Titling', 'serif'],
        'lora': ['Lora', 'serif'],
        'fhwa-series': ['FHWA Series D 2020', 'sans-serif'],
      }
    },
  },
  plugins: [],
}