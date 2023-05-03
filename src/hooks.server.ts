import type { Handle } from '@sveltejs/kit';
import { getLangFromSlug } from '$i18n/routesLangMap'

export const handle = (({ event, resolve }) => {
    let lang = event.locals.lang ?? null
    // console.log(event)
    if (!lang) {
        if (event.url.pathname === '/')
            lang = event.request.headers.get('accept-language')?.split(';')[0]
                .includes('en')
                ? 'en'
                : 'fr'
        else
            lang = getLangFromSlug(event.route.id as string, event.url.pathname)
    }

    event.locals = { ...event.locals, lang }

    return resolve(event, {
        transformPageChunk: ({ html }) => html.replace('%lang%', lang as string)
    });

}) satisfies Handle;

