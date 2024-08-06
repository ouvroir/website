import { derived, writable, get } from 'svelte/store';
import translations from './translations';
import type { Project, Member, Event, OuvroirData } from '$lib/types';

// Code greatly inspired by:
// https://dev.to/danawoodman/svelte-quick-tip-adding-basic-internationalization-i18n-to-you-app-2lm

export const locale = writable('fr' as 'fr' | 'en');
export const locales = Object.keys(translations);

export function translate(locale: string, key: string, vars: { [key: string]: string }) {
	if (!key) throw new Error('[error i18n] No key provided to $t()');
	if (!locale) throw new Error(`[error i18n] No translation for key "${key}"`);

	// Grab the translation from the translations object
	let text = translations[locale][key];
	if (!text) throw new Error(`[error i18n] No translation found for ${locale}.${key}`);

	// Replace variables in the translation string
	Object.keys(vars).map((k) => {
		const regex = new RegExp(`{{${k}}}`, 'g');
		text = text.replace(regex, vars[k]);
	});

	return text;
}

export const t = derived(
	locale,
	($locale) =>
		(key: string, vars = {}) =>
			translate($locale, key, vars)
);

/**
 * Reverse translation
 */
export const rt = derived(locale, ($locale) => (key: string, vars = {}) => {
	const lang = $locale === 'fr' ? 'en' : 'fr';
	return translate(lang, key, vars);
});

export const paramLangMap: { [key: string]: { [key: string]: 'fr' | 'en' } } = {
	home: {
		home: 'en',
		accueil: 'fr'
	},
	news: {
		news: 'en',
		actualites: 'fr'
	},
	projects: {
		projects: 'en',
		projets: 'fr'
	},
	about: {
		about: 'en',
		'a-propos': 'fr',
		'our-services': 'en',
		'nos-services': 'fr'
	}
};

export const getLangFromParam = (param: Partial<Record<string, string>>) => {
	let lang: 'fr' | 'en' = 'fr';
	Object.keys(param).forEach((key) => {
		if (key in paramLangMap) {
			lang = paramLangMap[key][param[key] as string];
		}
	});
	return lang;
};

export const localize = derived(locale, ($locale) => <T extends OuvroirData[]>(data: T): T => {
	if (!Array.isArray(data)) throw new Error('cannot localize data');
	if (data[0].meta.kind === 'meeting') return data;
	return data.filter((d) => d.meta.path.includes(`-${$locale}.md`)) as T;
});

export const dateToLocalizedString = derived(locale, ($locale) => (dateString: string) => {
	const l = $locale === 'fr' ? 'fr-CA' : 'en-CA';
	const date = new Date(dateString);
	return date.toLocaleDateString(l, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC'
	});
});

export const generateContentURI = (slug: string, kind: string) => {
	const kindRouteMap: Record<string, string> = {
		blog: 'route.news.blog',
		event: 'route.news.event',
		meeting: 'route.news.meeting',
		member: 'route.about.member',
		project: 'route.projects',
		about: 'route.about',
		presentation: 'presentations',
		services: 'route.services'
	}

	return `${get(t)(kindRouteMap[kind])}/${slug}`
}
