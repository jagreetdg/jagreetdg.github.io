/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		// Be specific about file patterns to help with tree-shaking
		"./src/components/**/*.{ts,tsx}",
		"./src/lib/**/*.{ts,tsx}",
		"./src/context/**/*.{ts,tsx}",
		"./src/services/**/*.{ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
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
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			// Add custom animations that are actually used
			animation: {
				pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
				spin: "spin 1s linear infinite",
				"shimmer-slide": "shimmer-slide var(--speed, 2s) ease-in-out infinite",
				shimmer: "shimmer 3s ease-in-out infinite",
			},
			keyframes: {
				"shimmer-slide": {
					"0%": {
						transform: "translateX(-100%)",
					},
					"100%": {
						transform: "translateX(200%)",
					},
				},
				shimmer: {
					"0%": {
						transform: "translateX(-100%) translateY(-100%) rotate(45deg)",
					},
					"50%": {
						transform: "translateX(150%) translateY(-50%) rotate(45deg)",
					},
					"100%": {
						transform: "translateX(-100%) translateY(-100%) rotate(45deg)",
					},
				},
			},
		},
	},
	// Enable optimizations
	future: {
		hoverOnlyWhenSupported: true,
	},
	// Specify safelist for dynamic classes to ensure they're included
	safelist: [
		// Animation classes
		"animate-pulse",
		"animate-spin",
		"animate-shimmer-slide",
		"animate-shimmer",
		// Opacity classes used in animations
		"opacity-0",
		"opacity-10",
		"opacity-15",
		"opacity-20",
		"opacity-25",
		"opacity-30",
		"opacity-60",
		"opacity-70",
		"opacity-80",
		"opacity-85",
		"opacity-90",
		// Transform classes used in animations
		"scale-0",
		"scale-1",
		"translate-x-0",
		"translate-y-0",
		"-translate-y-1",
		"-translate-y-6",
		"-translate-y-8",
		"-translate-y-10",
		"translate-y-3",
		"translate-y-4",
		"translate-y-6",
		"translate-y-8",
		"translate-y-12",
		"translate-y-16",
		"translate-x-6",
		"translate-x-8",
		"translate-x-10",
		"translate-x-12",
		"-translate-x-6",
		"-translate-x-8",
		"-translate-x-10",
		"-translate-x-12",
	],
	plugins: [],
};
