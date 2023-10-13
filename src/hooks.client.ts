import type { Handle } from '@sveltejs/kit';
import { getLangFromParam } from '$i18n/i18n'


export const handle = (({ event, resolve }) => {
    // current locale is set based on url. If locale cannot be deduced from url (ie from '/'), 
    // a check is made to see if locale is set in locals (meaning that user as already visited at least one page).
    let lang: 'fr' | 'en' | null = getLangFromParam(event.params) || null

    console.log('[hooks]', event.url.pathname, event.params, getLangFromParam(event.params))

    // As a fallback, look at the accept-language header
    if (!lang) {
        lang = event.request.headers.get('accept-language')?.split(';')[0] === 'en'
            ? 'en'
            : 'fr'
    }

    return resolve(event, {
        transformPageChunk: ({ html }) => html.replace('%lang%', lang as string)
    });


}) satisfies Handle;

