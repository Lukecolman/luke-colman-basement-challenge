import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"]
      },
      fontSize: {
        "geist-76": ["4.75rem", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
        "geist-40": ["2.5rem", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "geist-38": ["2.375rem", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "geist-24": ["1.5rem", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        "geist-20": ["1.25rem", { lineHeight: "1.2", letterSpacing: "0" }],
        "geist-16": ["1rem", { lineHeight: "1.3", letterSpacing: "0" }],
        "geist-14": ["0.875rem", { lineHeight: "1.4", letterSpacing: "0" }],
        "geist-mono-14": ["0.875rem", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
        "geist-13": ["0.8125rem", { lineHeight: "1", letterSpacing: "0" }]
      },
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        "basement-light-grey": "rgb(var(--color-basement-light-grey) / <alpha-value>)",
        "basement-medium-grey": "rgb(var(--color-basement-medium-grey) / <alpha-value>)",
        "basement-dark-grey": "rgb(var(--color-basement-dark-grey) / <alpha-value>)",
        "basement-orange": "rgb(var(--color-basement-orange) / <alpha-value>)",
        "basement-grey": "rgb(var(--color-basement-grey) / <alpha-value>)"
      },
      borderRadius: {
        ui: "var(--radius-ui)"
      },
      maxWidth: {
        container: "var(--container-width)"
      },
      transitionTimingFunction: {
        standard: "var(--ease-standard)"
      }
    }
  },
  plugins: []
};

export default config;
