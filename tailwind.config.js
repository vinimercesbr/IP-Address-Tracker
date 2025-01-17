/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
      },
    },
    screens: {
        'mobile': {'max': '412px'},
        'desktop': {'min': '892px'},
      },
  },
  plugins: [],
}