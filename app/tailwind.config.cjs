const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			sans: ['Roboto', 'sans-serif'],
			serif: ['Merriweather', 'serif'],
		  },
		extend: {
			colors: {
				'primary': '#1B3F5F',
				'secondary': '#285F8F',
				'surface': '#EFF6FB',
				'background': '#CEE3F3',
				'error': '#CEE3F3',
			},
		}
	},
	

	plugins: [require("daisyui")],
	daisyui: {
		themes: [
		  {
			mytheme: {
			  primary: "#1B3F5F",
			  secondary: "#285F8F",
			  accent: "#37cdbe",
			  neutral: "#3d4451",
			  "base-100": "#ffffff",
			},
		  },
		  "beyond",
		],
	  },
};

module.exports = config;
