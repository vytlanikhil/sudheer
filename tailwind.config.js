/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-cream': '#FFF0F5',
        'baby-pink': '#FFE4E1',
        'rose-accent': '#FB7185',
        'hot-pink': '#EC4899',
        'deep-rose': '#BE123C',
        'dark-plum': '#881337',
        'charcoal': '#1E293B',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        fredoka: ['Fredoka', 'sans-serif'],
        handwriting: ['Caveat', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
