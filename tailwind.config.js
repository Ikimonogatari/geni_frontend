/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: ["class"],
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ["var(--font-mabry-pro)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar-hide")],
};
