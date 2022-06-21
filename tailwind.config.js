/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    fontFamily: {
      'display': ['Millisime', 'system-ui']
    },
    extend: {},
  },
  plugins: [],
}
