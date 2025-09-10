/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./App.{js,jsx,ts,tsx}", // Keep this in case you still have an App file
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          100: "#e9e8ff",
          200: "#d6d4ff",
          300: "#b9b1ff",
          400: "#9685ff",
          500: "#7D5FFF",
          600: "#6230f7",
          700: "#541ee3",
          800: "#4518bf",
          900: "#3a169c",
          950: "#220b6a",
          deep: "#370764",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
