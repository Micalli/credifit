/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // para texto geral
      },
      colors: {
        primary: "#057D88",
      },
    },
  },
  plugins: [],
};
