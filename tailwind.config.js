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
          100: "#faf5ff",
          200: "#f4e8ff",
          300: "#ebd5ff",
          400: "#dab4fe",
          500: "#c184fc",
          600: "#a855f7",
          700: "#9133ea",
          800: "#7a22ce",
          900: "#6621a8",
          950: "#531c87",
          deep: "#370764",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
