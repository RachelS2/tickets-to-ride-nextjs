// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'media',
  content: [
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  safelist: ["animate-blink"], // garante que não será purgeada
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      // --- seu blink ---
      keyframes: {
        blink: {
          '0%': { opacity: '1' },
          '50%': { opacity: '0.15' },
          '100%': { opacity: '1' },
        },
        // já existentes...
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "fade-in": { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "slide-in": { "0%": { transform: "translateX(-100%)" }, "100%": { transform: "translateX(0)" } },
      },
      animation: {
        blink: 'blink 1s linear infinite',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-in": "slide-in 0.5s ease-out",
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Lato', 'sans-serif'],
      },
      colors: {
        primary: 'var(--primary)',
        primaryForeground: 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        secondaryForeground: 'var(--secondary-foreground)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        accent: 'var(--accent)',
        accentForeground: 'var(--accent-foreground)',
      },
      backgroundImage: {
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-accent': 'var(--gradient-accent)',
      },
      boxShadow: {
        elegant: 'var(--shadow-rose)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
