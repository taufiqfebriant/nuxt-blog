import { VueQueryPlugin } from '@tanstack/vue-query';

export default defineNuxtPlugin((nuxtApp) => {
	return nuxtApp.vueApp.use(VueQueryPlugin);
});
