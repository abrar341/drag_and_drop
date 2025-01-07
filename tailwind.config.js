// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // Enables dark mode based on a 'dark' class
  theme: {
    extend: {


      screens: {
        'xs': '475px',
        'xs-1': '542px',
        ...defaultTheme.screens,
      },

      colors: {

      },
    },
  },

  plugins: [],
}
