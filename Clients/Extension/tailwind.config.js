/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['Proxima Nova', ...defaultTheme.fontFamily.sans],
    }
  },
  plugins: [],
}

