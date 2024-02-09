/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {

        slideinSAQ: {
          from: {
            opacity: "0",
            transform: "translateX(400px)",

          },
          to: {
            opacity: "1",
            transform: "translateX(0px)",
          },
        },
        slideinsiraj: {
          from: {
            opacity: "0",
            transform: "translateX(-3700px)",

          },
          to: {
            opacity: "1",
            transform: "translateX(0px)",
          },
        },
        slideinbasith: {
          from: {
            opacity: "0",
            transform: "translateX(3700px)",

          },
          to: {
            opacity: "1",
            transform: "translateX(0px)",
          },
        },
        slideinsalman: {
          from: {
            opacity: "0",
            transform: "translateY(8000px)",

          },
          to: {
            opacity: "1",
            transform: "translateY(0px)",
          },
        },
        slideinjp: {
          from: {
            opacity: "0",
            transform: "translateX(3700px)",

          },
          to: {
            opacity: "1",
            transform: "translateX(0px)",
          },
        },
        slideinjmc: {
          from: {
            opacity: "0",
            transform: "translateX(-37px)",

          },
          to: {
            opacity: "1",
            transform: "translateX(0px)",
          },
        },
      },
      animation: {
        slideinSAQ: "slideinSAQ 1s ease 300ms",
        slideinsiraj: "slideinsiraj 2s ease 300ms",
        slideinbasith: "slideinbasith 3s ease 300ms",
        slideinsalman: "slideinsalman 5s ease 300ms",
        slideinjp: "slideinjp 4s ease 300ms",
        slideinjmc: "slideinjmc 2s ease 300ms"
      }
    },
  },
  plugins: [],
}