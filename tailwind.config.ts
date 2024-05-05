import FlowbiteReact from "flowbite/plugin";
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
// @ts-ignore
import tailwindcssAnimated from "tailwindcss-animated";

const myPlugin = plugin(function ({ addUtilities }) {
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
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      height: { 600: "600px" },
      zIndex: { top: "9999" },
    },
  },
  plugins: [myPlugin, FlowbiteReact, tailwindcssAnimated],
  darkMode: "media",
};

export default tailwind;
