import type { Handle } from '@sveltejs/kit';
import { building } from '$app/environment';
import { getLangFromParam, locale } from '$i18n/i18n'
import { get } from 'svelte/store';

export const handle = (({ event, resolve }) => {
    if (building)
        console.log('[hooks.buildMode] crawling', event.url.pathname)

    // current locale is set based on url. If locale cannot be deduced from url (ie from '/'), 
    // a check is made to see if locale is set in locals (meaning that user as already visited at least one page).
    let lang: 'fr' | 'en' = getLangFromParam(event.params) ?? get(locale) as 'fr' | 'en'

    // As a fallback, look at the accept-language header
    if (!lang) {
        lang = event.request.headers.get('accept-language')?.split(';')[0] === 'en'
            ? 'en'
            : 'fr'
    }

    locale.set(lang)

    return resolve(event, {
        transformPageChunk: ({ html }) => html.replace('%lang%', lang as string)
    });


}) satisfies Handle;

