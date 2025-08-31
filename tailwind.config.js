/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
  	extend: {
  		maxWidth: {
  			'1440': '1440px'
  		},
  		colors: {
  			blue: {
  				'60': '#BEDBFF',
  				'70': '#8EC5FF',
  				'80': '#51A2FF',
  				'90': '#2B7FFF',
  				'100': '#2563EB',
  				'110': '#1447E6',
  				'120': '#2626EB',
  				light1: '#7499EB',
  				light2: '#EFF6FF'
  			},
  			green: {
  				accent: 'var(--green-accent)'
  			},
  			black: 'var(--black)',
  			gray: {
  				'30': 'var(--gray-30)',
  				'40': 'var(--gray-40)',
  				'50': 'var(--gray-50)',
  				'60': 'var(--gray-60)',
  				'70': 'var(--gray-70)',
  				'80': 'var(--gray-80)',
  				'90': 'var(--gray-90)',
  				'100': 'var(--gray-100)'
  			},
  			navy: 'var(--navy)',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			cardForeground: 'var(--card-foreground)',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: 'var(--sidebar)',
  			sidebarForeground: 'var(--sidebar-foreground)',
  			sidebarPrimary: 'var(--sidebar-primary)',
  			sidebarAccent: 'var(--sidebar-accent)',
  			sidebarAccentForeground: 'var(--sidebar-accent-foreground)',
  			sidebarBorder: 'var(--sidebar-border)',
  			sidebarRing: 'var(--sidebar-ring)',
  			background: 'hsl(var(--background))',
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
