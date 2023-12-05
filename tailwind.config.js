const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.html",
    "./src/**/*.js",
    "./src/**/*.jsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins'], // Usar la fuente Poppins como fuente predeterminada
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
