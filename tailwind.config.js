/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: '#000000',
          'black-soft': '#0A0A0A',
          'gray-dark': '#1A1A1A',
          'gray-mid': '#2D2D2D',
          'gray-light': '#4A4A4A',
          white: '#FFFFFF',
          'white-soft': '#F5F5F5',
          gold: '#D4AF37',
          'gold-light': '#E8D7A0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      letterSpacing: {
        'luxury': '0.1em',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'slide-up': 'slide-up 0.8s ease-out forwards',
        'slide-up-delay-1': 'slide-up 0.8s ease-out 0.2s forwards',
        'slide-up-delay-2': 'slide-up 0.8s ease-out 0.4s forwards',
        'slide-up-delay-3': 'slide-up 0.8s ease-out 0.6s forwards',
      },
    },
  },
  plugins: [],
};
