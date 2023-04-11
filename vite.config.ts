import { sveltekit } from '@sveltejs/kit/vite';
import { plugin as markdown } from 'vite-plugin-markdown'
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit(), markdown()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
};

export default config;
