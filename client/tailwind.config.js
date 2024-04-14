/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        padding: {
          'sm': '0 20px',
          'md': '0 100px'
        }
      },
    },
  },
  plugins: [],
}

