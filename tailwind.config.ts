import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      colors: {
        paper: "var(--paper)",
        "paper-deep": "var(--paper-deep)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        "ink-faint": "var(--ink-faint)",
        rule: "var(--rule)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        brand: "var(--brand)",
      },
    },
  },
  plugins: [],
};
export default config;
