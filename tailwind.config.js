/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      zIndex: {
        "-1": "-1",
      },
      colors: {
        "theme-button": "#000000",
        "theme-text": "#636262",

        "theme-image-light": "#C4C4C4",
        "theme-image-dark": "#9D9D9D",

        "theme-bg-light": "#FFFFFF",
        "theme-bg-dark": "#ECECEC",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
}
