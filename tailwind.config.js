/** @type {import('tailwindcss').Config} */
export const content = [
  './src/**/*.{js,jsx,ts,tsx}',
];
export const theme = {
  extend: {},
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
