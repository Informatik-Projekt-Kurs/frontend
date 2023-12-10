import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontSize: {
        sm: "0.750rem",
        base: "1rem",
        xl: "1.333rem",
        "2xl": "1.777rem",
        "3xl": "2.369rem",
        "4xl": "3.158rem",
        "5xl": "4.210rem"
      },
      fontFamily: {
        heading: "undefined",
        body: "Poppins"
      },
      fontWeight: {
        normal: "400",
        bold: "700"
      }
    }
  },

  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        meetmate: {
          "base-300": "#14151e",
          "base-200": "#191b24",
          "base-content": "#d1eaff",
          neutral: "#14151e",
          "neutral-content": "#14151e",
          accent: "#4f37c8",
          "accent-content": "#d1eaff",
          primary: "#4586e6",
          "primary-content": "#d1eaff",
          secondary: "#1d3b86",
          "secondary-content": "#d1eaff",
          error: "#f97272",
          "error-content": "#470000",
          info: "#3abef7",
          "info-content": "#012a3e",
          success: "#37d39a",
          "success-content": "#013321",
          warning: "#fabe22",
          "warning-content": "#382900"
        }
      }
    ]
  }
};
export default config;
