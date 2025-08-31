/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      maxWidth: {
        1440: "1440px",
      },
      colors: {
        blue: {
          120: "#2626EB",
          110: "#1447E6",
          100: "#2563EB",
          90: "#2B7FFF",
          80: "#51A2FF",
          70: "#8EC5FF",
          60: "#BEDBFF",
          light1: "#7499EB",
          light2: "#EFF6FF",
        },
        green: {
          accent: "var(--green-accent)",
        },

        black: "var(--black)",
        gray: {
          100: "var(--gray-100)",
          90: "var(--gray-90)",
          80: "var(--gray-80)",
          70: "var(--gray-70)",
          60: "var(--gray-60)",
          50: "var(--gray-50)",
          40: "var(--gray-40)",
          30: "var(--gray-30)",
        },

        navy: "var(--navy)",

        foreground: "var(--foreground)",
        card: "var(--card)",
        cardForeground: "var(--card-foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        muted: "var(--muted)",
        destructive: "var(--destructive)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",

        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
        },

        sidebar: "var(--sidebar)",
        sidebarForeground: "var(--sidebar-foreground)",
        sidebarPrimary: "var(--sidebar-primary)",
        sidebarAccent: "var(--sidebar-accent)",
        sidebarAccentForeground: "var(--sidebar-accent-foreground)",
        sidebarBorder: "var(--sidebar-border)",
        sidebarRing: "var(--sidebar-ring)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
