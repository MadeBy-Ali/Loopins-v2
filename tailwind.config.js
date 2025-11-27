/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'earth-green': '#703315',
        'soft-brown': '#A65D3F',
        'light-cream': '#F5E6D3',
        'dark-green': '#703315',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        bold: '700',
      },
    },
  },
  plugins: [],
}