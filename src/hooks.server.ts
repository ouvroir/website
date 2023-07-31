import type { Handle } from '@sveltejs/kit';

const getLangFromParam = (param: Partial<Record<string, string>>) => {
    const paramLangMap: { [key: string]: { [key: string]: string } } = {
        news: {
            news: 'en',
            actualites: 'fr'
        },
        projects: {
            projects: 'en',
            projets: 'fr'
        },
        services: {
            'our-services': 'en',
            'nos-services': 'fr'
        },
        about: {
            about: 'en',
            'a-propos': 'fr'
        }
    };

    let lang = null
    Object.keys(param).forEach(key => {
        if (key in paramLangMap) {
            lang = paramLangMap[key][param[key] as string]
        }
    })
    return lang
}


export const handle = (({ event, resolve }) => {

    // current locale is set based on url. If locale cannot be deduced from url (ie from '/'), 
    // a check is made to see if locale is set in locals (meaning that user as already visited at least one page).
    let lang: 'fr' | 'en' | null = getLangFromParam(event.params) ?? event.locals.lang as 'fr' | 'en' | null

    // As a fallback, look at the accept-language header
    if (!lang) {
        lang = event.request.headers.get('accept-language')?.split(';')[0] === 'en'
            ? 'en'
            : 'fr'
    }

    event.locals = { ...event.locals, lang }

    return resolve(event, {
        transformPageChunk: ({ html }) => html.replace('%lang%', lang as string)
    });

}) satisfies Handle;

