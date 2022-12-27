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
};

module.exports = config;
