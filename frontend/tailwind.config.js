/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#0b1f3a",
          900: "#0e2a52",
          800: "#123a6b",
          700: "#164a86",
        },
        saffron: "#FF9933",
        indiagreen: "#138808",
      },
      fontFamily: {
        display: ["'Poppins'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
