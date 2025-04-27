import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/theme';

export default {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // default: {
        //   DEFAULT: "#F3F4F6",
        //   foreground: "#fff",
        // }
        // primary: {
        //   DEFAULT: '#000',
        //   foreground: '#fff',
        //   background: '#ff0000',
        // },
      },
      aspectRatio: {
        mobile: '9 / 16',
        tablet: '3 / 4',
        desktop: '16 / 9',
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#000',
              foreground: '#fff',
            },
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: '#3f3f46',
              foreground: '#fff',
            },
          },
        },
      },
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
    }),
  ],
} satisfies Config;
