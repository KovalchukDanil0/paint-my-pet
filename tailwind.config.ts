import FlowbiteReact from "flowbite/plugin";
import type { Config } from "tailwindcss";

const tailwind: Config = {
  content: [
    "src/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: { zIndex: { "9999": "9999" } },
  },
  plugins: [FlowbiteReact],
  darkMode: "media",
};

export default tailwind;
