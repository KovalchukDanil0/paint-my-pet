import FlowbiteReact from "flowbite/plugin";
import type { Config } from "tailwindcss";
// @ts-ignore
import tailwindcssAnimated from "tailwindcss-animated";

const tailwind: Config = {
  content: [
    "src/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: { zIndex: { top: "9999" } },
  },
  plugins: [FlowbiteReact, tailwindcssAnimated],
  darkMode: "media",
};

export default tailwind;
