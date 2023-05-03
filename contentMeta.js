import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { default as fm } from 'front-matter';

/**
 * Reads labouvroir and generate js object with content metadata
 */

const basePath = './src/lib/labouvroir/';

const projectsMetadata = () => {
	const base = basePath + 'projets/';
	const files = readdirSync(base);

	const content = { fr: [], en: [] };
	files.forEach((f) => {
		const meta = fm(readFileSync(base + f, { encoding: 'utf-8' })).attributes;
		if (f.includes('template')) return;
		if (meta.draft) return;

		content[meta.lang].push({
			filename: base + f,
			...meta
		});
	});
	console.log(content);
	return content;
};

writeFileSync(
	'./src/lib/i18n/meta/contentMeta.json',
	JSON.stringify({ projects: projectsMetadata() })
);
