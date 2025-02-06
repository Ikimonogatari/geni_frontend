/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx,tsx}",
    "./components/**/*.{js,jsx,tsx}",
    "./app/**/*.{js,jsx,tsx}",
    "./src/**/*.{js,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "geni-blue": "#4D55F5",
        primary: "#2D262D",
        "geni-gray": "#CDCDCD",
        secondary: "#CA7FFE",
        "primary-bg": "#F5F4F0",
        "geni-red": "#DD2B1F",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ["var(--font-mabry-pro)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
