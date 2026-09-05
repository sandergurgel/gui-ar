/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060B18',
          900: '#0B1329',
          800: '#0F172A',
          700: '#1E293B',
          600: '#1E3A8A',
          500: '#1E40AF',
          400: '#2563EB',
        },
        sky: {
          500: '#0284C7',
          400: '#38BDF8',
          300: '#7DD3FC',
        },
        ice: {
          50: '#F8FAFC',
          100: '#F0F4F8',
          200: '#E2E8F0',
        },
        emergency: '#DC2626',
        warning: '#D97706',
        success: '#16A34A',
      },
    },
  },
  plugins: [],
}
