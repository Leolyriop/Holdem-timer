/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        poker: {
          green: '#1a5c2a',
          darkgreen: '#0d3a1a',
          gold: '#c9a84c',
          darkgold: '#8a6d1e',
          red: '#8b0000',
          black: '#0a0a0a',
          felt: '#1e4d2b',
        }
      },
      fontFamily: {
        display: ['Oswald', 'Impact', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blink': 'blink 1s step-end infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-in',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        slideUp: {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        glow: {
          from: { textShadow: '0 0 10px #c9a84c, 0 0 20px #c9a84c' },
          to: { textShadow: '0 0 20px #c9a84c, 0 0 40px #c9a84c, 0 0 60px #c9a84c' },
        }
      }
    },
  },
  plugins: [],
};
