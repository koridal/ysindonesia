// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./node_modules/@shadcn/ui/dist/*.{js,ts,jsx,tsx}", // shadcn/ui 사용 시
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0E1B0E",
        limeBase: "#C8F560",
        limeSoft: "#E9FFC7",
        limeDeep: "#224A21",
        aqua: "#00E5FF",
        teal: "#00C2A8",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.15)",
        "glass-deep": "0 12px 48px rgba(0,0,0,0.18)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      maxWidth: {
        "8xl": "88rem",
      },
    },
  },
  plugins: [],
} satisfies Config;