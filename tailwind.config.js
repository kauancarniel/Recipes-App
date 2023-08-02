/** @type {import('tailwindcss').Config} */
export const content = [
  './src/**/*.{js,jsx,ts,tsx}',
];
export const theme = {
  extend: {
    animation: {
      open: 'open 0.9s ease-in-out',
      btnAnim1: 'btnAnim1 1.5s linear infinite',
      btnAnim2: 'btnAnim2 1.5s linear .375s infinite',
      btnAnim3: 'btnAnim3 1.5s linear .75s infinite',
      btnAnim4: 'btnAnim4 1.5s linear 1.125s infinite',
    },
    keyframes: {
      open: {
        '0%': {
          opacity: 0,
          heigth: 0,
        },
        '100%': {
          opacity: 1,
          heigth: 'auto',
        },
      },
      btnAnim1: {
        '0%': {
          left: '-100%',
        },
        '50%': {
          left: '100%',
        },
        '100%': {
          left: '100%',
        },
      },
      btnAnim2: {
        '0%': {
          top: '-100%',
        },
        '50%': {
          top: '100%',
        },
        '100%': {
          top: '100%',
        },
      },
      btnAnim3: {
        '0%': {
          right: '-100%',
        },
        '50%': {
          right: '100%',
        },
        '100%': {
          right: '100%',
        },
      },
      btnAnim4: {
        '0%': {
          bottom: '-100%',
        },
        '50%': {
          bottom: '100%',
        },
        '100%': {
          bottom: '100%',
        },
      },
      show: {
        '0%': {
          opacity: 0,
          transform: 'scale(0)',
        },
        '100%': {
          opacity: 1,
          transform: 'scale(1)',
        },
      },
    },
    gridTemplateColumns: {
      'auto-fill': 'repeat(auto-fill, 148px)',
      'sm-auto-fill': 'repeat(auto-fill, 180px)',
    },
  },

  fontFamily: {
    epilogue: ['Epilogue', 'sans-serif'],
  },
  screens: {
    xs: '397px',
    sm: '550px',
    md: '800px',
    lg: '1024px',
  },
};
export const plugins = [];
