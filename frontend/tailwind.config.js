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
        darkPurple: '#a61ba66f',
        veryDarkPurple: '#15001f',
        lightLavender: '#e7bffa',
        brightLavender: '#d180f8',
        almostWhite: '#fefefe',
      },
    },
  },
}
