import { readdirSync, readFileSync } from 'fs';
import { resolve } from 'path';
import markdownit from 'markdown-it';
import markdownitfm from 'markdown-it-front-matter';
import frontmatter from 'front-matter';
import ilcomment from 'markdown-it-inline-comments';
import mdiframe from 'markdown-it-iframe';
import { attrs } from "@mdit/plugin-attrs";
import { figure } from "@mdit/plugin-figure";


import type {
	Project,
	Event,
	Meeting,
	Member,
	Blog,
	Resource,
	StaticDocument,
	GenericDocument
} from '$lib/types';

const get = (path: string, filters: (fn: string) => boolean = () => true) => {
	return readdirSync(resolve(path))
		.filter(filters)
		.filter((f: string) => f.endsWith('.md') && !f.includes('template'))
		.map((f: string) => resolve(path, f));
};

export const contents = {
	projects: get('src/lib/labouvroir/projets'),
	members: get('src/lib/labouvroir/equipe'),
	events: get('src/lib/labouvroir/evenements'),
	meetings: get('src/lib/labouvroir/cr'),
	blog: get('src/lib/labouvroir/blog'),
	resources: get('src/lib/labouvroir/ressources'),
	presentation: get('src/lib/labouvroir/lab', (fn) => fn.includes('presentation-short')),
	about: get('src/lib/labouvroir', (fn) => fn.includes('about')),
	support: get('src/lib/labouvroir/lab', (fn) => fn.includes('financement')),
	services: get('src/lib/labouvroir/lab', (fn) => fn.includes('services'))
};

export function fetchData(
	type: keyof typeof contents
): Project[] | Event[] | Meeting[] | Member[] | Blog[] | Resource[] | StaticDocument[] | GenericDocument[] {
	const typeConstructors: Record<
		keyof typeof contents,
		(
			path: string,
			meta: any,
			html: string
		) => Member | Project | Event | Meeting | Blog | StaticDocument
	> = {
		projects: (path, meta, html) =>
			({
				meta: { ...meta, kind: 'project', path },
				html
			}) as Project,

		members: (path, meta, html) => ({
			meta: { ...meta, kind: 'member', path, title: `${meta.firstname} ${meta.lastname}` },
			html
		}) as Member,

		events: (path, meta, html) => {
			if (meta.recurrent) {
				const today = new Date();
				const dayOfWeek = today.getDay();
				const next = new Date(today);

				if (meta.recurrent === 'fika') {
					const daysUntilTuesday = (9 - dayOfWeek) % 7;
					next.setDate(today.getDate() + daysUntilTuesday);
				} else if (meta.recurrent === 'clinique') {
					const daysUntilMonday = (8 - dayOfWeek) % 7;
					next.setDate(today.getDate() + daysUntilMonday);
				}
				meta.dateStart = next
				meta.dateEnd = next
			}
			return ({
				meta: { ...meta, kind: 'event', slug: createSlugFromFilename(path), path },
				html
			}) as Event
		},
		meetings: (path, meta, html) =>
			({
				meta: { ...meta, kind: 'meeting', slug: createSlugFromFilename(path), path },
				html
			}) as Meeting,

		blog: (path, meta, html) =>
			({
				meta: { ...meta, kind: 'blog', slug: createSlugFromFilename(path), path },
				html
			}) as Blog,
		resources: (path, meta, html) => ({
			meta: { ...meta, kind: 'resource', slug: createSlugFromFilename(path), path },
			html
		}) as Resource,
		presentation: (path, meta, html) =>
			({
				meta: { ...meta, kind: 'presentation', path },
				html
			}) as StaticDocument,
		support: (path, meta, html) =>
			({ meta: { ...meta, kind: 'support', path }, html }) as StaticDocument,
		services: (path, meta, html) =>
			({ meta: { ...meta, kind: 'services', path }, html }) as StaticDocument,
		about: (path, meta, html) =>
			({ meta: { ...meta, kind: 'about', path }, html }) as StaticDocument
	};

	return contents[type]
		.map(file => {
			const content = readFileSync(file, 'utf-8');
			const meta = parseFrontMatter(content);
			const html = cleanHtml(parseMarkdown(content));

			return typeConstructors[type](file, meta, html);
		})
		.filter((content) => {
			// Only filters contents that are not drafts
			// Contents needs to have meta otherwise it will be NOT be filtered out
			if (!content.meta) return false
			else if (!('draft' in content.meta)) return true
			else return !content.meta.draft
		})
		.sort((a, b) => {
			if (!('date' in a.meta) || !('date' in b.meta)) return 0;
			return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
		})
}

const parseFrontMatter = (content: string) => {
	return frontmatter(content).attributes;
};

const parseMarkdown = (content: string) => {
	const md = markdownit()
		.use(markdownitfm, (fm) => null)
		.use(mdiframe)
		.use(ilcomment)
		.use(figure)
		.use(attrs);
	return md.render(content);
};

const cleanHtml = (html: string): string => {
	return html.replace(/<a /g, "<a target='_blank' rel='external'");
	// .replace(/<img /g, "<img loading='lazy' ")
};

export function createSlugFromFilename(filename: string) {
	filename = filename.split('/').at(-1)!;
	return encodeURIComponent(filename.replace('.md', ''));
}

export function createProjectSlug(filename: string) {
	filename = filename.split('/').at(-1)!.split('-')[0]
	return encodeURIComponent(filename);
}