import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/app/**/*.{ts,tsx,js,jsx}",
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        fonts: {
          mulish: { value: "var(--font-mulish)" },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",

  // Enable JSX style props
  jsxFramework: "react",

  // Global CSS
  globalCss: {
    body: {
      fontFamily: `mulish`,
    },
    a: {
      textDecoration: "dotted underline 1px",
      color: "inherit",
      _hover: {
        textDecoration: "none",
        color: "blue.600",
      },
    },
  },
});
