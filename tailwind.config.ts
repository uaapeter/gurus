import { brown } from "@mui/material/colors";
import type { Config } from "tailwindcss";
import colors, { black, gray, green, orange, pink, purple, red, yellow } from 'tailwindcss/colors'


export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      blue: {
          light: '#85d7ff',
          DEFAULT: '#1fb6ff',
          dark: '#009eeb',
      },
      pink,
      orange,
      yellow,
      red,
      green,
      purple,
      brown,
      black,
      //   gray: {
      //     darkest: '#1f2d3d',
      //     dark: '#3c4858',
      //     DEFAULT: '#c0ccda',
      //     light: '#e0e6ed',
      //     lightest: '#f9fafc',
      //   },
      gray,
    white:{
        light: '#FFFF'
    },
    primary: '#02b3b7',
    secondary: '#1fc998',
    neutral: colors.gray,
    success: '#1fc998'

  }
  },
  plugins: [
  ],
} satisfies Config;
