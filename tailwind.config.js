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
        bg: 'var(--bg)',
        surface: {
          1: 'var(--surface-1)',
          2: 'var(--surface-2)',
          3: 'var(--surface-3)',
        },
        text: {
          1: 'var(--text-1)',
          2: 'var(--text-2)',
          3: 'var(--text-3)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          lime: 'var(--accent-lime)',
          warm: 'var(--accent-warm)',
        },
        border: {
          DEFAULT: 'var(--border)',
          hover: 'var(--border-hover)',
          active: 'var(--border-active)',
        },
      },
      fontFamily: {
        display: ['Syne', '-apple-system', 'sans-serif'],
        body: ['Inter', '-apple-system', 'sans-serif'],
        code: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(2.5rem, 5vw, 5rem)', { lineHeight: '1.0', letterSpacing: '-0.03em', fontWeight: '700' }],
        'heading': ['clamp(1.75rem, 3.5vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '600' }],
        'subheading': ['clamp(1.1rem, 1.8vw, 1.4rem)', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '500' }],
        'body': ['clamp(0.9rem, 1.1vw, 1rem)', { lineHeight: '1.65', letterSpacing: '0', fontWeight: '400' }],
        'small': ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' }],
        'micro': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.06em', fontWeight: '500' }],
      },
      spacing: {
        'section': 'clamp(5rem, 12vw, 10rem)',
        'section-sm': 'clamp(3rem, 8vw, 6rem)',
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
        'pill': '100px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
};
