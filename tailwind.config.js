/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1400px",
    },
    extend: {
      colors: {
        silver: "#EBEBEB",
        bloody: "#C30000",
      },
      fontFamily: {
        "sofia-condensed": ["Sofia Sans Extra Condensed", "sans-serif"],
        sofia: ["Sofia Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      screens: { lgDown: { max: "1023px" } },
      backgroundImage: {
        "yellow-gradient":
          "linear-gradient(180deg, rgba(100, 91, 89, 0.00) 55%, rgba(234, 174, 60, 0.80) 100%)",
      },
    },
  },
  plugins: [],
};
