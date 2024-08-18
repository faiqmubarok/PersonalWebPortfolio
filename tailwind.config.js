/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'roboto-slab': ['Roboto Slab', 'serif'],
        'expletus-sans': ['Expletus Sans', 'cursive'],
      },
      colors: {
        'accentColor': '#1A73E3',
        'lightPrimary' : '#EEEEEE',
        'lightSecondary' : '#44566C',
        'darkPrimary' : '#1D1D1D',
        'darkSecondary' : '#A6A6A6',
      },
      keyframes: {
        gradientAnimation : {
          '0%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
          '100%': {
            'background-position': '0% 50%',
          },
        }
      },
      animation : {
        gradientAnimation : 'gradientAnimation 5s ease infinite'
      }
    },
  },
  plugins: [],
}

