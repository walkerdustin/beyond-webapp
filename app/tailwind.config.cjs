const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			sans: ['Roboto', 'sans-serif'],
			serif: ['Merriweather', 'serif'],
		  },
		extend: {
			colors: {
				'primary': '#314f69',
				'secondary': '#b7deff',
				'surface': '#ffffff',
				'background': '#e2e2e2',
				'error': '#FF9494',
			},
		}
	},
	

	plugins: []
};

module.exports = config;
