// @ts-check

import js from "@eslint/js";
import mdx from "eslint-plugin-mdx";
import globals from "globals";
import tseslint from "typescript-eslint";

// @ts-ignore
import reactHooks from "eslint-plugin-react-hooks";
// @ts-ignore
import reactRefresh from "eslint-plugin-react-refresh";

export default tseslint.config(
  {
    ...mdx.flat,
    processor: mdx.createRemarkProcessor({
      lintCodeBlocks: true,
      // optional, if you want to disable language mapper, set it to `false`
      // if you want to override the default language mapper inside, you can provide your own
      languageMapper: {},
    }),
    ignores: ["dist"],
  },
  {
    ...mdx.flatCodeBlocks,
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx,mdx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...mdx.flatCodeBlocks.rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      "no-var": "error",
      "prefer-const": "error",

      "no-restricted-imports": [
        "error",
        {
          name: "next/link",
          message: "Please import from `@/i18n/routing` instead.",
        },
        {
          name: "next/navigation",
          importNames: [
            "redirect",
            "permanentRedirect",
            "useRouter",
            "usePathname",
          ],
          message: "Please import from `@/i18n/routing` instead.",
        },
      ],
    },
  },
);
