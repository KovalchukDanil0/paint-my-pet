import daisyui from "daisyui";
import type { Config } from "tailwindcss";
import tailwindcssAnimated from "tailwindcss-animated";

export default {
  content: [
    "src/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
  ],
  theme: {
    extend: {
      zIndex: { top: "9999" },
    },
  },
  plugins: [daisyui, tailwindcssAnimated],
  darkMode: "media",
} satisfies Config;
