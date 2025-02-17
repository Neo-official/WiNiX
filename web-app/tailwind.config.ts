import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content : [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme   : {
		container: {
			center : true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend   : {
			colors      : {
				background : 'hsl(var(--background))',
				foreground : 'hsl(var(--foreground))',
				card       : {
					DEFAULT   : 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				popover    : {
					DEFAULT   : 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				primary    : {
					DEFAULT   : 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary  : {
					DEFAULT   : 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				muted      : {
					DEFAULT   : 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent     : {
					DEFAULT   : 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT   : 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				info       : {
					DEFAULT   : 'hsl(var(--info))',
					foreground: 'hsl(var(--info-foreground))',
					50        : 'hsl(222 80% 95%)',
					100       : 'hsl(222 80% 90%)',
					200       : 'hsl(222 80% 80%)',
					300       : 'hsl(222 80% 70%)',
					400       : 'hsl(222 80% 60%)',
					500       : 'hsl(222 80% 50%)',
					600       : 'hsl(222 80% 40%)',
					700       : 'hsl(222 80% 30%)',
					800       : 'hsl(222 80% 20%)',
					900       : 'hsl(222 80% 10%)',
				},
				success    : {
					DEFAULT   : 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))',
					50        : 'hsl(142 71% 95%)',
					100       : 'hsl(142 71% 90%)',
					200       : 'hsl(142 71% 80%)',
					300       : 'hsl(142 71% 70%)',
					400       : 'hsl(142 71% 60%)',
					500       : 'hsl(142 71% 45%)',
					600       : 'hsl(142 71% 35%)',
					700       : 'hsl(142 71% 25%)',
					800       : 'hsl(142 71% 15%)',
					900       : 'hsl(142 71% 10%)',
				},
				warning    : {
					DEFAULT   : 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))',
					50        : 'hsl(38 92% 95%)',
					100       : 'hsl(38 92% 90%)',
					200       : 'hsl(38 92% 80%)',
					300       : 'hsl(38 92% 70%)',
					400       : 'hsl(38 92% 60%)',
					500       : 'hsl(38 92% 50%)',
					600       : 'hsl(38 92% 40%)',
					700       : 'hsl(38 92% 30%)',
					800       : 'hsl(38 92% 20%)',
					900       : 'hsl(38 92% 10%)',
				},
				error      : {
					DEFAULT   : 'hsl(var(--error))',
					foreground: 'hsl(var(--error-foreground))',
					50        : 'hsl(0 92% 95%)',
					100       : 'hsl(0 92% 90%)',
					200       : 'hsl(0 92% 80%)',
					300       : 'hsl(0 92% 70%)',
					400       : 'hsl(0 92% 65%)',
					500       : 'hsl(0 84% 60%)',  // matches your --error variable
					600       : 'hsl(0 72% 51%)',
					700       : 'hsl(0 74% 42%)',
					800       : 'hsl(0 70% 35%)',
					900       : 'hsl(0 62% 30%)',
				},
				border     : 'hsl(var(--border))',
				input      : 'hsl(var(--input))',
				ring       : 'hsl(var(--ring))',
				chart      : {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))',
				},
				sidebar    : {
					DEFAULT             : 'hsl(var(--sidebar-background))',
					foreground          : 'hsl(var(--sidebar-foreground))',
					primary             : 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent              : 'hsl(var(--sidebar-accent))',
					'accent-foreground' : 'hsl(var(--sidebar-accent-foreground))',
					border              : 'hsl(var(--sidebar-border))',
					ring                : 'hsl(var(--sidebar-ring))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes   : {
				'accordion-down': {
					from: {
						height: '0',
					},
					to  : {
						height: 'var(--radix-accordion-content-height)',
					},
				},
				'accordion-up'  : {
					from: {
						height: 'var(--radix-accordion-content-height)',
					},
					to  : {
						height: '0',
					},
				},
			},
			animation   : {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up'  : 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins : [require("tailwindcss-animate")],
} satisfies Config;
