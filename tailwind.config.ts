import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    extend: {
      screens: {
        'small-800': '800px',
        'small-640': '640px',
        'small-500': '500px'
      },
      dropShadow: {
        'red': '0 8px 8px rgba(255, 0, 0, 0.1)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config