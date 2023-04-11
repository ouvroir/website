import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { routes } from './routes.js';

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
				'*', // Prerender all non-dynamic routes
				'/projets',
				'/projects',
				'/about',
				'/a-propos',
				'/events',
				'/evenements',
				...routes
			]
		},
		alias: {
			$lib: 'src/lib/*',
			$i18n: 'src/lib/i18n/*',
			$ouvroir: 'src/lib/labouvroir/*',
			$components: 'src/lib/components'
		}
	}
};

export default config;
