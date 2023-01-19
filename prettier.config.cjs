/** @type {import("prettier").Config} */
module.exports = {
	useTabs: true,
	singleQuote: true,
	plugins: [require.resolve('prettier-plugin-tailwindcss')],
};
