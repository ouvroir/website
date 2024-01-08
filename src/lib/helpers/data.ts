import type {
	Project,
	Event,
	Meeting,
	Member,
	Blog,
	StaticDocument,
	GenericDocument
} from '$lib/types';

const getBlogs = async () => await import.meta.glob(`$lib/labouvroir/blog/*.md`);

const getEvents = async () => await import.meta.glob(`$lib/labouvroir/evenements/*.md`);

const getCr = async () => await import.meta.glob(`$lib/labouvroir/cr/*.md`);

const getTeam = async () => await import.meta.glob(`$lib/labouvroir/equipe/*.md`);

const getProjects = async () => await import.meta.glob(`$lib/labouvroir/projets/*.md`);

const getSupportFiles = async () => await import.meta.glob(`$lib/labouvroir/lab/financement-*.md`);

const getAbout = async () => await import.meta.glob(`$lib/labouvroir/about-*.md`);

const getShortPresentation = async () =>
	await import.meta.glob(`$lib/labouvroir/lab/presentation-short-*.md`);

const getServices = async () => await import.meta.glob(`$lib/labouvroir/lab/services-*.md`);

export const setup = {
	projects: getProjects,
	blog: getBlogs,
	team: getTeam,
	meeting: getCr,
	support: getSupportFiles,
	event: getEvents,
	about: getAbout,
	services: getServices,
	presentation: getShortPresentation
};

export async function fetchData(
	type: keyof typeof setup
): Promise<
	Project[] | Event[] | Meeting[] | Member[] | Blog[] | StaticDocument[] | GenericDocument[]
> {
	const typeConstructors: Record<
		keyof typeof setup,
		(path: string, meta: any, html: string) => any
	> = {
		projects: (path, meta, html) =>
			({
				meta: { ...meta, kind: 'project', path },
				html
			}) as Project,

		team: (path, meta, html) => ({ meta: { ...meta, kind: 'member', path }, html }) as Member,

		event: (path, meta, html) =>
			({
				meta: { ...meta, kind: 'event', slug: createSlugFromFilename(path), path },
				html
			}) as Event,

		meeting: (path, meta, html) =>
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

	const iteralbleFiles = Object.entries(await setup[type]());

	const mdFiles = await Promise.all(
		iteralbleFiles
			.filter(([path]) => !path.includes('template'))
			.map(async ([path, resolver]) => {
				const md = await resolver();
				const mdHtml = md.default.render().html as string;

				const constructor = typeConstructors[type];
				if (!constructor) throw new Error(`No constructor for type ${type}`);

				let document;
				try {
					document = constructor(path, md.metadata, md.metadata.draft ? '' : cleanHtml(mdHtml));
				} catch (err) {
					console.log('problem with file', path);
					console.log(md.metadata);
					throw err;
				}

				return document;
			})
	);

	// Only filters contents that are not drafts
	// Contents needs to have meta otherwise it will be NOT be filtered out
	return mdFiles.filter((md) => {
		if (!md.meta) return true;
		if ('draft' in md.meta) return !md.meta.draft;
		return true;
	});
}

const cleanHtml = (html: string): string => {
	return html.replace(/<a /g, "<a target='_blank' rel='external'");
	// .replace(/<img /g, "<img loading='lazy' ")
};

export function createSlugFromFilename(filename: string) {
	filename = filename.split('/').at(-1)!;
	return encodeURIComponent(filename.replace('.md', ''));
}
