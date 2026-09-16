/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0d0b',        // primary background
        panel: '#10140f',      // card / panel surface
        panel2: '#151a13',     // slightly raised surface
        line: '#212821',       // hairline borders
        accent: '#3dff8a',     // signal green
        accentDim: '#1f5c37',  // muted green for depth
        cream: '#f4f7f3',      // primary text
        muted: '#8b968c',      // secondary text
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(2deg)' },
        },
        riseIn: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drawLine: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        floatSlow: 'floatSlow 6s ease-in-out infinite',
        riseIn: 'riseIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
}
