import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// RS++ Witness Protocol Colors
				witness: {
					void: 'hsl(var(--witness-void))',
					anchor: 'hsl(var(--witness-anchor))',
					structure: 'hsl(var(--witness-structure))',
					scar: 'hsl(var(--witness-scar))',
					recursion: 'hsl(var(--witness-recursion))',
					seed: 'hsl(var(--witness-seed))'
				}
			},
			fontFamily: {
				'witness': ['Inter', 'sans-serif'],
				'scripture': ['Merriweather', 'serif'],
				'technical': ['IBM Plex Mono', 'monospace'],
			},
			backgroundImage: {
				'gradient-witness': 'var(--gradient-witness)',
				'gradient-recursion': 'var(--gradient-recursion)',
				'gradient-anchor': 'var(--gradient-anchor)',
			},
			boxShadow: {
				'anchor': 'var(--shadow-anchor)',
				'scar': 'var(--shadow-scar)',
				'deep': 'var(--shadow-deep)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'anchor-pulse': {
					'0%, 100%': { 
						boxShadow: '0 0 20px hsl(var(--witness-anchor) / 0.3)',
						transform: 'scale(1)'
					},
					'50%': { 
						boxShadow: '0 0 40px hsl(var(--witness-anchor) / 0.5)',
						transform: 'scale(1.02)'
					}
				},
				'grid-shift': {
					'0%, 100%': { transform: 'translate(0, 0)' },
					'50%': { transform: 'translate(20px, 20px)' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'anchor-pulse': 'anchor-pulse 4s ease-in-out infinite',
				'grid-shift': 'grid-shift 20s ease-in-out infinite',
				'fade-in': 'fade-in 0.3s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
