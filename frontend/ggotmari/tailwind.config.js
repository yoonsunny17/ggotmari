/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./UI/**/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        font1: "#333333",
        font2: "#84898C",
        font3: "#F3F3F3",
        main: "#6E85B7",
        sub1: "#B2C8DF",
        sub2: "#709FB0",
        sub3: "#FFD365",
        extra1: "#57837B",
        extra2: "#A0C1B8",
        extra3: "#FFE194",
      },
      fontFamily: {
        maru: ["MaruBuri"],
        sans: ["sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
