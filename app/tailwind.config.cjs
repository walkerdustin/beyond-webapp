const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			sans: ['Roboto', 'sans-serif'],
			serif: ['Merriweather', 'serif'],
		  },
		
		colors: {
			extend: {
				'primary': '#314f69',
				'secondary': '#b7deff',
				'surface': '#ffffff',
				'background': '#e2e2e2',
			}
		},
		extend: {
			colors: {
				'primary': '#314f69',
				'secondary': '#b7deff',
				'surface': '#ffffff',
				'background': '#e2e2e2',
			},
		}
	},
	

	plugins: []
};

module.exports = config;
