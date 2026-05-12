import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem", // px-5
        lg: "2.5rem",       // px-10
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      maxWidth: {
        container: "1280px",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Geist", "Geist Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        fraunces: ["Fraunces", "Georgia", "Times New Roman", "serif"],
        geist: ["Geist", "Geist Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--text-primary)",
        border: "var(--border)",
        "border-on-dark": "var(--border-on-dark)",
        input: "var(--border)",
        ring: "var(--primary)",

        surface: {
          DEFAULT: "var(--background)",
          bg: "var(--surface-bg)",
          card: "var(--surface-card)",
          elevated: "var(--surface-elevated)",
          tint: "var(--surface-tint)",
          dark: "var(--surface-dark)",
          darker: "var(--surface-darker)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          "on-dark": "var(--text-on-dark)",
          "on-dark-muted": "var(--text-on-dark-muted)",
        },
        "border-subtle": "var(--border-subtle)",
        "border-default": "var(--border-default)",
        logo: {
          base: "var(--logo-base)",
          "base-deep": "var(--logo-base-deep)",
          deep: "var(--logo-deep)",
          tint: "var(--logo-tint)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          deep: "var(--primary-deep)",
          tint: "var(--primary-tint)",
          light: "var(--primary-light)",
          foreground: "var(--text-on-dark)",
        },

        "pole-nettoyage": {
          base: "var(--pole-nettoyage-base)",
          deep: "var(--pole-nettoyage-deep)",
          tint: "var(--pole-nettoyage-tint)",
          light: "var(--pole-nettoyage-light)",
        },
        "pole-diag": {
          "base-onlight": "var(--pole-diag-base-onlight)",
          "base-ondark": "var(--pole-diag-base-ondark)",
          deep: "var(--pole-diag-deep)",
          tint: "var(--pole-diag-tint)",
        },
        "pole-agri": {
          "base-onlight": "var(--pole-agri-base-onlight)",
          "base-ondark": "var(--pole-agri-base-ondark)",
          deep: "var(--pole-agri-deep)",
          tint: "var(--pole-agri-tint)",
        },
        "pole-transport": {
          base: "var(--pole-transport-base)",
          deep: "var(--pole-transport-deep)",
          tint: "var(--pole-transport-tint)",
          light: "var(--pole-transport-light)",
        },

        "cat-nettoyage": "#5082AC",
        "cat-diagnostic": "#14B8A6",
        "cat-agriculture": "#16A34A",
        "cat-transport": "#F59E0B",
        "cat-cas-clients": "#8B5CF6",
        "cat-actualites-drone": "#DC2626",
        "cat-actualites-boite": "#475569",

        // shadcn compatibility (mapped to brand)
        secondary: {
          DEFAULT: "var(--surface-tint)",
          foreground: "var(--text-primary)",
        },
        muted: {
          DEFAULT: "var(--surface-tint)",
          foreground: "var(--text-secondary)",
        },
        accent: {
          DEFAULT: "var(--primary-tint)",
          foreground: "var(--primary-deep)",
        },
        destructive: {
          DEFAULT: "var(--pole-diag-base-onlight)",
          foreground: "var(--text-on-dark)",
        },
        popover: {
          DEFAULT: "var(--background)",
          foreground: "var(--text-primary)",
        },
        card: {
          DEFAULT: "var(--background)",
          foreground: "var(--text-primary)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "soft-sm": "var(--shadow-sm)",
        "soft-md": "var(--shadow-md)",
        "soft-lg": "var(--shadow-lg)",
        "soft-xl": "var(--shadow-xl)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
