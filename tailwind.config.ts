import FlowbiteReact from "flowbite/plugin";
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const tailwind: Config = {
  content: [
    "src/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    FlowbiteReact,
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".drag-none": {
          "-webkit-user-drag": "none",
          "-khtml-user-drag": "none",
          "-moz-user-drag": "none",
          "-o-user-drag": "none",
          "user-drag": "none",
        },
      });
    }),
  ],
  darkMode: "media",
};

export default tailwind;
