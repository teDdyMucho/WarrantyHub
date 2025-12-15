/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'warranty-black': '#000000',
        'warranty-gray': '#3E3636',
        'warranty-red': '#D72323',
        'warranty-light': '#F5EDED',
      },
    },
  },
  plugins: [],
}
