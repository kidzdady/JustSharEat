/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF8C00', // SharEat Orange
        secondary: '#32CD32', // SharEat Green
        accent: '#FFD700', // Image-inspired Yellow/Orange (for selections)
        premium: '#FFC107', // SharEat Gold
        background: '#FAF7F2', // Light Cream/Off-White
        surface: '#FFFFFF', // White (for cards)
        'text-primary': '#2D3748', // Dark Gray/Black
        'text-secondary': '#718096', // Medium Gray
        border: '#E2E8F0', // Light Gray
        success: '#4CAF50', // Image-inspired Green
        error: '#F44336', // Standard Red
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      borderRadius: {
        sm: '0.125rem', // 2px
        DEFAULT: '0.25rem', // 4px
        md: '0.375rem', // 6px
        lg: '0.5rem', // 8px
        xl: '0.75rem', // 12px
        '2xl': '1rem', // 16px
        '3xl': '1.5rem', // 24px
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        none: 'none',
      },
      // Spacing can be extended if specific values are needed beyond Tailwind's defaults
      // spacing: {
      //   '128': '32rem',
      // }
    },
  },
  plugins: [],
};