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
				'primary-hue': {
					'100': '#E6F0F8',
					'200': '#CCE1F1',
					'300': '#B3D2EA',
					'400': '#99C3E3',
					'500': '#80B4DC',
					'600': '#66A5D5',
					'700': '#4D96CE',
					'800': '#3387C7',
					'900': '#1978C0',
				},
			},
		},

	},
	
	plugins: []
};

module.exports = config;
