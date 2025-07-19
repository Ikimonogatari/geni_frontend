/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx,tsx}",
    "./components/**/*.{js,jsx,tsx}",
    "./app/**/*.{js,jsx,tsx}",
    "./src/**/*.{js,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    // extend: {
    // 	colors: {
    // primary: '#2D262D',
    // 'geni-gray': '#CDCDCD',
    // secondary: '#CA7FFE',
    // 'primary-bg': '#F5F4F0',
    // 'geni-red': '#DD2B1F',
    // sidebar: {
    //   DEFAULT: 'hsl(var(--sidebar-background))',
    //   foreground: 'hsl(var(--sidebar-foreground))',
    //   primary: 'hsl(var(--sidebar-primary))',
    //   'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    //   accent: 'hsl(var(--sidebar-accent))',
    //   'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    //   border: 'hsl(var(--sidebar-border))',
    //   ring: 'hsl(var(--sidebar-ring))',
    // 		}
    // 	},
    // 	fontFamily: {
    // 		sans: [
    // 			'var(--font-mabry-pro)'
    // 		]
    // 	}
    // }
    extend: {
      colors: {
        "geni-blue": "#4D55F5",
        "geni-pink": "#CA7FFE",
        "geni-green": "#4FB755",
        "geni-orange": "#F49D19",
        "geni-yellow": "#C8F423",
        "geni-gray": "#CDCDCD",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        "primary-bg": "#F5F4F0",
        "geni-red": "#DD2B1F",
        border: "hsl(var(--border))",
        "border-gray": "hsl(var(--border-gray))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "slideInRight": {
          "0%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
          "50%": {
            transform: "translateX(-10px)",
            opacity: "0.8",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        "slideOutRight": {
          "0%": {
            transform: "translateX(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
        },
        "bounceIn": {
          "0%": {
            transform: "scale(0.3)",
            opacity: "0",
          },
          "50%": {
            transform: "scale(1.05)",
            opacity: "0.8",
          },
          "70%": {
            transform: "scale(0.9)",
            opacity: "0.9",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        "glow": {
          "0%, 100%": {
            boxShadow: "0 0 5px rgba(251, 191, 36, 0.5)",
          },
          "50%": {
            boxShadow: "0 0 20px rgba(251, 191, 36, 0.8), 0 0 30px rgba(251, 191, 36, 0.6)",
          },
        },
        "fadeIn": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slideInRight": "slideInRight 0.5s ease-out",
        "slideOutRight": "slideOutRight 0.3s ease-in",
        "bounceIn": "bounceIn 0.6s ease-out",
        "glow": "glow 2s ease-in-out infinite",
        "fadeIn": "fadeIn 0.5s ease-out forwards",
      },
      fontFamily: {
        sans: ["var(--font-mabry-pro)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar-hide")],
};
