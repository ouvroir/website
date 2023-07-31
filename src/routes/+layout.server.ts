import { fetchData } from '$lib/helpers/data'
import { redirect } from '@sveltejs/kit'

export const prerender = true

export const load = async (event) => {

    let support = null

    if (event.url.pathname === '/') {
        if (event.locals.lang === 'fr')
            throw redirect(301, '/accueil')
        else
            throw redirect(301, '/home')
    }

    if (event.route.id && (
        event.route.id.includes('home') ||
        event.route.id.includes('about'))) {

        support = await fetchData(event.locals.lang, 'support')
        support = support[0]
    }

    return {
        support,
        lang: event.locals.lang
    }
}