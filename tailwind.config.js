/** @type {import('tailwindcss').Config} */
export const content = [
  './src/**/*.{js,jsx,ts,tsx}',
];
export const theme = {
  extend: {
    animation: {
      open: 'open 0.5s ease-in-out',
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
    },
  },
  fontFamily: {
    epilogue: ['Epilogue', 'sans-serif'],
  },
  screens: {
    smm: '320px',
    sm: '394px',
    md: '768px',
    lg: '1024px',
  },
};
export const plugins = [];
