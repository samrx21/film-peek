/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#059669',
      secondary: '#025940',
      tertiary: '#50F296',
      backBase: '#070D0C',
      ctmWht: '#FFFFFF',
      backButton: '#007752'
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
}
