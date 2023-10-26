/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,jsx}",
    "./public/**/*.html",
    "./app/**/*.{js,jsx}",
  ],
  plugins: [require("flowbite/plugin")],
  theme: {},
};
