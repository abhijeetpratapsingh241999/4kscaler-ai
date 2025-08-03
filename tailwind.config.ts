import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Original design se match karne ke liye v3-style colors use kar rahe hain.
        gray: colors.neutral,
        blue: colors.blue,
        purple: colors.purple,
        violet: colors.violet,
        green: colors.green,
        red: colors.red,
        amber: colors.amber,
        yellow: colors.yellow,
        sky: colors.sky,
        indigo: colors.indigo,
        pink: colors.pink,
        
        // Custom CSS variables ko theme mein add kar rahe hain.
        'primary-color': 'var(--primary-color)',
        'background-dark': 'var(--background-dark)',
        'container-dark': 'var(--container-dark)',
        'text-main-dark': 'var(--text-main-dark)',
        'text-secondary-dark': 'var(--text-secondary-dark)',
        'background-light': 'var(--background-light)',
        'container-light': 'var(--container-light)',
        'text-main-light': 'var(--text-main-light)',
        'text-secondary-light': 'var(--text-secondary-light)',
      }
    },
  },
  plugins: [],
} satisfies Config
