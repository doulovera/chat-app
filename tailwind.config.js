/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: {
          dark: '#22282c',
          darker: '#202224',
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
