import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			fallback: 'app.html'
		}),
		prerender: {
			entries: [
				'/projets',
				'/projects',
				'/about',
				'/a-propos',
				'/events',
				'/evenements',
				'*' // Prerender all non-dynamic routes
			]
		},
		alias: {
			$lib: 'src/lib/*',
			$i18n: 'src/lib/i18n/*',
			$components: 'src/lib/components'
		}
	}
};

export default config;
