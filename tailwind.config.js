/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        headings: ["Bricolage Grotesque", "sans-serif"],
      },
      colors: {
        primary: "#FFBF00",
        navy: "#00008b",
        green: "#6CB36C",
        customBlack: "#475467", // renamed to avoid clashing with Tailwind’s built-in black
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
}
