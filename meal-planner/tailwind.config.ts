import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          100: '#EAF3DE',
          600: '#3B6D11',
          700: '#27500A',
        },
        amber: {
          100: '#FAEEDA',
          500: '#BA7517',
        },
        cream: {
          50:  '#FAFAF7',
          100: '#F3F2EE',
          200: '#E4E2DA',
        },
      },
      fontFamily: {
        sans:    ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['DM Serif Display', 'Georgia', 'serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        lift: '0 4px 12px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config;
