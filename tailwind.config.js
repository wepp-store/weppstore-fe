const { nextui } = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    // './node_modules/@nextui-org/theme/dist/components/(button|input|ripple|spinner).js',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      aspectRatio: {
        mobile: '9 / 16',
        tablet: '3 / 4',
        desktop: '16 / 9',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
