/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      }
    },
    extend: {
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        display: ['Playfair Display', 'serif'],
        body: ['Libre Baskerville', 'serif'],
      },
      colors: {
        default: '#ffb700', 
      },
    },
  },
  plugins: [],
}

