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
      // colors: {
      //   default: {
      //     DEFAULT: "#F3F4F6",
      //     foreground: "#fff",
      //   }
      // },
      aspectRatio: {
        mobile: '9 / 16',
        tablet: '3 / 4',
        desktop: '16 / 9',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui({
    layout: {
      // radius: {
      //   small: "0.125rem",
      //   medium: "0.25rem",
      //   large: "0.5rem",
      //   xlarge: "0.75rem",
      //   xxlarge: "1rem",
      //   xxxlarge: "1.5rem",
      //   full: "9999px",
      // },
    },
  })],
};