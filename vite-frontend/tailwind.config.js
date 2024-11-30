/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      colors: {
        darkGray: '#141619',    // Color 1
        charcoal: '#2C2E3A',    // Color 2
        navy: '#050A44',        // Color 3
        royalBlue: '#0A21C0',   // Color 4
        lightGray: '#B3B4BD',
      },
    },
  },
}
