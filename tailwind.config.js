const { fontFamily } = require('tailwindcss/defaultTheme'); // eslint-disable-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin'); // eslint-disable-line @typescript-eslint/no-var-requires

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,vue,ts}', './nuxt.config.{js,ts}', './app.vue'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', ...fontFamily.sans],
			},
		},
	},
	plugins: [
		require('@tailwindcss/line-clamp'),
		plugin(function ({ addBase }) {
			addBase({
				html: {
					fontSize: '10px',
				},
			});
		}),
	],
};
