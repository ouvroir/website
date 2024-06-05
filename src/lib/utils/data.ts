import { readdirSync, readFileSync } from 'fs';
import { resolve } from 'path';
import markdownit from 'markdown-it';
import markdownitfm from 'markdown-it-front-matter';
import frontmatter from 'front-matter';
import ilcomment from 'markdown-it-inline-comments';


import type {
	Project,
	Event,
	Meeting,
	Member,
	Blog,
	StaticDocument,
	GenericDocument
} from '$lib/types';

const get = (path: string, filters: (fn: string) => boolean = () => true) => {
	return readdirSync(resolve(path))
		.filter(filters)
		.filter((f) => f.endsWith('.md') && !f.includes('template'))
		.map((f) => resolve(path, f));
};

export const setup = {
	projects: get('src/lib/labouvroir/projets'),
	members: get('src/lib/labouvroir/equipe'),
	events: get('src/lib/labouvroir/evenements'),
	meetings: get('src/lib/labouvroir/cr'),
	blog: get('src/lib/labouvroir/blog'),
	presentation: get('src/lib/labouvroir/lab', (fn) => fn.includes('presentation-short')),
	about: get('src/lib/labouvroir', (fn) => fn.includes('about')),
	support: get('src/lib/labouvroir/lab', (fn) => fn.includes('financement')),
	services: get('src/lib/labouvroir/lab', (fn) => fn.includes('services'))
};

export function fetchData(
	type: keyof typeof setup
): Project[] | Event[] | Meeting[] | Member[] | Blog[] | StaticDocument[] | GenericDocument[] {
	const typeConstructors: Record<
		keyof typeof setup,
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

		members: (path, meta, html) => ({ meta: { ...meta, kind: 'member', path }, html }) as Member,

		events: (path, meta, html) =>
			({
				meta: { ...meta, kind: 'event', slug: createSlugFromFilename(path), path },
				html
			}) as Event,

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

	const files = setup[type];

	return files
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
			if (!('draft' in content.meta)) return true
			return !content.meta.draft;
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
	const md = markdownit().use(markdownitfm, (fm) => null).use(ilcomment);
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

export function generateURI({ slug, kind, locale }: { slug: string; kind: string; locale: string }) {
	return `/${kind}/${slug}`;
}