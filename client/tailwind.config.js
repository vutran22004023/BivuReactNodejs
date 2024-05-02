/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      padding: {
        'pad-sm': '0 10px',
        'pad-md': '0 160px'
      }
    },
  },
  plugins: [],
}



