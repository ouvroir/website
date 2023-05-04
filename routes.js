import { readdirSync } from 'node:fs';
import abstractRoutes from './src/lib/i18n/abstractRoutes.js';
import contentMeta from './src/lib/i18n/meta/contentMeta.json' assert { type: 'json' };
/**
 * This codes reads the content in labouvroir to generate routes (before building
 * the website and before starting dev server).
 * These routes are then fed to sveltekit crawler (see svelte.config.js)
 */

const baseRoutes = Object.keys(abstractRoutes).reduce((acc, k) => {
	Object.keys(abstractRoutes[k]).forEach((lang) => acc.push(abstractRoutes[k][lang]));
	return acc;
}, []);

const projectsRoutes = () => {
	console.log('Creating projects routes');

	const projects = [];
	Object.keys(contentMeta).forEach((lang) => {
		contentMeta[lang].projects.forEach((p) => {
			lang === 'fr' ? projects.push(`/projets/${p.slug}`) : projects.push(`/projects/${p.slug}`);
		});
	});

	console.log(projects);
	return projects;
};

const teamRoutes = () => {
	console.log('Creating team routes');
	const files = readdirSync('./src/lib/labouvroir/equipe');

	const team = files.map((f) => {
		return f.includes('en')
			? '/the-lab/members/' + f.slice(0, -6)
			: '/le-laboratoire/membres/' + f.slice(0, -6);
	});

	// console.log(console.log(team));
	return team;
};

export const routes = [...baseRoutes, ...projectsRoutes()];

console.log('created routes', routes);
