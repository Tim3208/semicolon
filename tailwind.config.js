/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,css}"],

  theme: {
    extend: {
      maxWidth: {
        1440: "1440px",
      },
      colors: {
        blue: {
          60: "#BEDBFF",
          70: "#8EC5FF",
          80: "#51A2FF",
          90: "#2B7FFF",
          100: "#2563EB",
          110: "#1447E6",
          120: "#2626EB",
          light1: "#7499EB",
          light2: "#EFF6FF",
        },
        green: {
          accent: "var(--green-accent)",
        },
        black: "var(--black)",
        gray: {
          30: "var(--gray-30)",
          40: "var(--gray-40)",
          50: "var(--gray-50)",
          60: "var(--gray-60)",
          70: "var(--gray-70)",
          80: "var(--gray-80)",
          90: "var(--gray-90)",
          100: "var(--gray-100)",
        },
        navy: "#111827",
        foreground: "#374151",
        card: {
          DEFAULT: "#fefce8",
          foreground: "#374151",
        },
        primary: "#d97706",
        secondary: "#f59e0b",
        muted: "#fefce8",
        destructive: "#dc2626",
        border: "#e5e7eb",
        input: "#fefce8",
        ring: "#d97706",
        chart: {
          1: "#d97706",
          2: "#f59e0b",
          3: "#374151",
          4: "#fefce8",
          5: "#dc2626",
        },
        sidebar: "#fefce8",
        sidebarForeground: "#374151",
        sidebarPrimary: "#d97706",
        sidebarAccent: "#f59e0b",
        sidebarBorder: "#e5e7eb",
        sidebarRing: "#d97706",
        background: "var(--background)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
