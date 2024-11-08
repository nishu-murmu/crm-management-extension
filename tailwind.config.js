/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/popup/index.html',
    './src/popup/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  prefix: 'cp-',
  theme: {
    spacing: {
      px: '1px',
      0: '0',
      0.5: '2px',
      1: '4px',
      1.5: '6px',
      2: '8px',
      2.5: '10px',
      3: '12px',
      3.5: '14px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      9: '36px',
      10: '40px',
      11: '44px',
      12: '48px',
      14: '56px',
      16: '64px',
      20: '80px',
      24: '96px',
      28: '112px',
      32: '128px',
      36: '144px',
      40: '160px',
      44: '176px',
      48: '192px',
      52: '208px',
      56: '224px',
      60: '240px',
      64: '256px',
      72: '288px',
      80: '320px',
      96: '384px',
    },
    fontSize: {
      xxs: ['10px', '14px'],
      xs: ['12px', '16px'],
      sm: ['14px', '16px'],
      base: ['16px', '20px'],
      lg: ['18px', '25.4px'],
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px',
      '6xl': '60px',
      '7xl': '72px',
    },
    lineHeight: {
      5: '20px',
    },
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        xls: '1400px',
        '2xl': '1536px',
      },
      container: {
        screens: {
          DEFAULT: '1920px',
        },
        padding: '0px',
        center: true,
      },
      colors: {
        green: {
          DEFAULT: '#4CAF50',
          dark: '#004358',
          light: '#819da6',
        },
        primary: {
          text: '#1E293B',
          background: '#F1F5F9',
        },
        gray: { DEFAULT: '#707070', light: '#ddd' },
        black: {
          DEFAULT: '#000000',
        },
      },
      borderRadius: {
        DEFAULT: '4px',
        sm: '2px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
      },
      boxShadow: {
        header: '0px 3px 4px 0px #00000015',
        body: '-4px 4px 10px 0px #00000040',
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-in-out',
        'fade-out': 'fade-out 0.4s ease-in-out',
        'translate-x-in': 'translate-x-in 0.5s ease-in-out',
        'translate-x-out': 'translate-x-out 0.4s ease-in-out',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'translate-x-in': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'translate-x-out': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};
