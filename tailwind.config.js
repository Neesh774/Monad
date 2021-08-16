const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    purge: [],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      extend: {
        fontFamily: {
            logo: ['Rubik'],
            text: ['Inter']
        },
        colors: {
            white:'#EAEAEA',
            textGray: '#666666',
            blue: '#4B82F3',
            logoGreen: '#53B555',
            pink: '#EF516F',
            black: '#000000',
            darkHeaderBg: '#1E1E1E'
          }
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }