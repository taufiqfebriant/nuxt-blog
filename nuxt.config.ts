// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	typescript: {
		shim: false,
	},
	srcDir: 'src/',
	css: ['~/assets/css/main.css'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	app: {
		head: {
			link: [
				{
					rel: 'preload',
					href: '/fonts/Inter.var.woff2',
					as: 'font',
					type: 'font/woff2',
					crossorigin: 'anonymous',
				},
			],
			bodyAttrs: {
				class: 'bg-white dark:bg-[#18181a] dark:text-white',
			},
		},
	},
	modules: ['nuxt-icon'],
});
