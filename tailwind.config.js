// tailwind.config.cjs
module.exports = {

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
     container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        primary: '#007b83',
        background: 'hsl(var(--background))',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}