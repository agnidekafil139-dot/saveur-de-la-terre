/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      colors: {

        primary: {
          DEFAULT: '#2D5016',
          50: '#f0f7ed',
          100: '#ddecd4',
          200: '#bddaad',
          300: '#96c27e',
          400: '#72a856',
          500: '#558d3d',
          600: '#2D5016',
          700: '#2a4a14',
          800: '#243e12',
          900: '#1f3311',
        },

        secondary: {
          DEFAULT: '#8B4513',
          50: '#faf5f0',
          100: '#f4e8d9',
          200: '#e8cfb3',
          300: '#d9b088',
          400: '#c8915e',
          500: '#b6743f',
          600: '#8B4513',
          700: '#7a3c10',
          800: '#65320e',
          900: '#532a0d',
        },

        accent: {
          DEFAULT: '#F4A300',
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#F4A300',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },

        danger: {
          DEFAULT: '#D32F2F',
          100: '#FEE2E2',
          500: '#D32F2F',
          700: '#B91C1C'
        },

        success: {
          DEFAULT: '#2E7D32',
          100: '#DCFCE7',
          500: '#2E7D32',
          700: '#15803D'
        },

        warning: {
          DEFAULT: '#F57C00',
          100: '#FFEDD5',
          500: '#F57C00',
          700: '#C2410C'
        },

        info: {
          DEFAULT: '#0288D1',
          100: '#DBEAFE',
          500: '#0288D1',
          700: '#0369A1'
        }

      },

      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif'],
      },

      spacing: {
        '128': '32rem',
        '144': '36rem',
      },

      borderRadius: {
        '4xl': '2rem',
      },

      boxShadow: {
        card: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
        'card-hover': '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
        'inner-custom': 'inset 0 2px 4px rgba(0,0,0,0.06)',
      },

      backgroundImage: {
        'hero-pattern': "url('/images/hero/home-hero.jpg')",
      },

      animation: {
        fadeIn: 'fadeIn 0.6s ease-out',
        fadeInUp: 'fadeInUp 0.6s ease-out',
        slideInRight: 'slideInRight 0.5s ease-out',
        slideInLeft: 'slideInLeft 0.5s ease-out',
      },

      keyframes: {

        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },

        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },

        slideInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },

        slideInLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        }

      }

    },
  },

  plugins: [],
}