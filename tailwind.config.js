/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'drips-dark': '#0a0a0a',
        'drips-gray': '#1a1a1a',
      },
      letterSpacing: {
        'widest-plus': '0.2em',
      },
    },
  },
  plugins: [],
};
