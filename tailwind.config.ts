import daisyui from "daisyui";
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
// @ts-ignore
import tailwindcssAnimated from "tailwindcss-animated";

const myPlugin = plugin(function ({ addUtilities, addComponents }) {
  addUtilities({
    ".center": {
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
    },
  });
});

const tailwind: Config = {
  content: [
    "src/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
  ],
  theme: {
    extend: {
      height: { 600: "600px" },
      zIndex: { top: "9999" },
    },
  },
  plugins: [myPlugin, daisyui, tailwindcssAnimated],
  darkMode: "media",
};

export default tailwind;
