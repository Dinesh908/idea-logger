/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        notion: {
          bg: '#ffffff',
          sidebar: '#f7f6f3',
          border: '#e9e9e7',
          text: '#37352f',
          textSecondary: '#787774',
          hover: '#f1f1ef',
          active: '#e9e9e7',
        },
      },
    },
  },
  plugins: [],
}

