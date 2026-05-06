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
        brand: {
          bg: '#F5F0EB',
          cta: '#C45C26',
          text: '#1A1A1A',
          muted: '#6B6B6B',
          white: '#FFFFFF',
        },
        // Legacy aliases for backward compat
        primary: '#C45C26',
        accent: '#C45C26',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
