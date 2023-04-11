import { readdirSync, readFileSync } from 'node:fs';
import * as fm from 'front-matter';

/**
 * This codes reads the content in labouvroir to generate routes (before building
 * the website and before starting dev server).
 * These routes are then fed to sveltekit crawler (see svelte.config.js)
 * @returns { routes } : routes generated from labouvroir content
 */

const createProjectsRoutes = () => {
	console.log('Creating projects routes');
	const basePath = './src/lib/labouvroir/projets/';
	const files = readdirSync(basePath);

	const projects = files
		.filter((f) => f !== '0-template-fr.md')
		.map((f) => {
			const front = fm.default(readFileSync(basePath + f, { encoding: 'utf-8' })).attributes;
			return f.includes('en') ? '/projects/' + front.slug : '/projets/' + front.slug;
		});

	// console.log(projects);
	return projects;
};

const createTeamRoutes = () => {
	console.log('Creating team routes');
	const files = readdirSync('./src/lib/labouvroir/equipe');

	const team = files.map((f) => {
		return f.includes('en') ? '/lab/members/' + f.slice(0, -6) : '/lab/membres/' + f.slice(0, -6);
	});

	// console.log(console.log(team));
	return team;
};

export const routes = [...createProjectsRoutes()];

console.log('created routes', routes);
