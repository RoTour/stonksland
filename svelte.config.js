import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

const devMode = process.env.NODE_ENV === 'development';
console.log("devMode", devMode, process.env.NODE_ENV, process.env.VERCEL_ENV);
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		csrf: { checkOrigin: process.env.NODE_ENV !== "development", },
		adapter: adapter(),
		
	},
};

export default config;