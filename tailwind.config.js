/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          dark: '#0f1117',
          surface: '#181b24',
          card: '#1f2430',
          border: '#2c3345',
          accent: '#6366f1',
          highlight: '#818cf8',
        }
      }
    },
  },
  plugins: [],
}

