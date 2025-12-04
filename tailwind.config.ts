/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "850px",
      // => @media (min-width: 768px) { ... }

      slg: "950px",

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        "site-dark-grey": "#171717",
        "site-lighter-grey": "#262626",
        "border-grey": "#404040",
        "site-blue": "#242736",
        "site-orange": "#ec5c29",
        "site-orange-hover": "#ef7449",
        "site-transparent-orange": "rgba(236, 92, 41, .2)",
        "site-transparent-blue": "rgba(36, 39, 54, .7)",
        "site-text-gray": "#808080",
        "site-green": "#6ee7b7",
        "site-transparent-green": "rgba(0, 231, 0, 0.1)",
        "site-transparent-red": "rgba(185, 0, 0, 0.3)",
        "site-green-light": "#047857",
      },
      backgroundImage: {},
      fontFamily: {
        roboto: ["'Roboto'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
