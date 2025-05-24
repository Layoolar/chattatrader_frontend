// tailwind.config.cjs
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#007b83',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}