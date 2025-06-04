/** @type {import("prettier").Config} */
module.exports = {
  plugins: ["prettier-plugin-tailwindcss"], // Ensures Tailwind CSS class order
  semi: true,
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: "es5",
  tabWidth: 2,
  useTabs: false,
  printWidth: 80,
  arrowParens: "always",
  endOfLine: "lf",
};