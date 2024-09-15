/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#4A90E2',
          green: '#7ED321',
        },
        secondary: {
          lightGray: '#F5F5F5',
          darkGray: '#4A4A4A',
        },
        alert: {
          red: '#D0021B',
          yellow: '#F8E71C',
        },
        background: {
          white: '#FFFFFF',
          lightGreen: '#E0F7E9',
        },
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

