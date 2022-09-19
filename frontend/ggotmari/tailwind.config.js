/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/index.jsx",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        font1: "#333333",
        font2: "#84898C",
        font3: "#F3F3F3",
        font4: "#868B8E",
        main: "#6E85B7",
        sub1: "#B2C8DF",
        sub2: "#709FB0",
        sub3: "#FFD365",
        extra1: "#57837B",
        extra2: "#A0C1B8",
        extra3: "#FFE194",
        extra4: "#D9D9D9",
      },
      fontFamily: {
        maru: ["MaruBuri"],
        sans: ["NanumBarunGothic", "sans-serif"],
        sansbold: ["NanumBarunGothicBold", "sans-serif"],
        sanslight: ["NanumBareunGothicLight", "sans-serif"],
        sansultralight: ["NanumBareunGothicUltraLight", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
