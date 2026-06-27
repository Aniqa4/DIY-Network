/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ProtestStrike: ["Protest Strike", "cursive"],
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      colors: {
        canvas: {
          DEFAULT: "#EDE8DF",
          light: "#F7F4EE",
          dark: "#D6CFC2",
        },
        ink: "#1A1918",
        phthalo: "#1B5E44",
        sienna: "#C94C1E",
      },
    },
  },
  plugins: [],
};
