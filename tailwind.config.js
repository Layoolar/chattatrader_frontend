// tailwind.config.cjs
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // This preserves Tailwind's default colors (blue-500, red-500, etc.)
      colors: {
        primary: '#3b82f6', // Optional: Add your custom color
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}