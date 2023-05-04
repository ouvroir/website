import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { default as fm } from 'front-matter';

/**
 * Reads labouvroir and generate js object with content metadata
 */

const getContentMetadata = () => {
	const content = {
		fr: { projects: [], blog: [], team: [] },
		en: { projects: [], blog: [], team: [] }
	};
	const pathMap = { '/projets': 'projects', '/blog': 'blog', '/equipe': 'team' };

	Object.keys(pathMap).forEach((path) => {
		const base = './src/lib/labouvroir' + path + '/';
		const files = readdirSync(base);

		files.forEach((f) => {
			const meta = fm(readFileSync(base + f, { encoding: 'utf-8' })).attributes;
			if (f.includes('template')) return;
			if (meta.draft) return;

			content[meta.lang][pathMap[path]].push({
				filename: base + f,
				...meta
			});
		});
	});

	return content;
};

/**
 * Temporary function
 * TODO: labouvroir should have a presentation directory with two files :
 * - about-en.md
 * - about-fr.md
 */
// const getPresentation = () => {
// 	const meta = fm(readFileSync(basePath + '/about.md', { encoding: 'utf-8' })).attributes;
// }

writeFileSync('./src/lib/i18n/meta/contentMeta.json', JSON.stringify(getContentMetadata()));
