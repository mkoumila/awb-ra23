/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        silver: "#EBEBEB",
        bloody: "#C30000",
      },
      fontFamily: {
        "sofia-condensed": ["Sofia Sans Condensed", "sans-serif"],
        sofia: ["Sofia Sans", "sans-serif"],
      },
      screens: { lgDown: { max: "1023px" } },
    },
  },
  plugins: [],
};
