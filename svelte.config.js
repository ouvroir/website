import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		prerender: {
			// entries: ['*', '/about', '/a-propos', '/a-propos/membres/williamdiakite']
		},
		paths: {
			base: dev ? '' : process.env.BASE_PATH
			// base: '/website'
		},
		alias: {
			$lib: 'src/lib/*',
			$i18n: 'src/lib/i18n/*',
			$components: 'src/lib/components'
		}
	},
	extensions: ['.svelte', '.md'],

	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extension: '.md'
		})
	]
};

export default config;
