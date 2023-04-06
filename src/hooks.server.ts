import type { Handle } from '@sveltejs/kit';
import { locale } from '$i18n/i18n';

/**
 * For a11y purposes
 * https://kit.svelte.dev/docs/accessibility#the-lang-attribute
 * TODO: locale should be set using user's prefered language. 
 * To do so check first incoming request and check accept-language in header
 */
export const handle = (({ event, resolve }) => {

    const lang = event.request.headers.get('accept-laguage') ?? 'fr'
    lang.includes('en')
        ? locale.set('en')
        : locale.set('fr')

    return resolve(event, {
        transformPageChunk: ({ html }) => html.replace('%lang%', lang)
    });
}) satisfies Handle;
