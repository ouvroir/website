import { fetchData } from '$lib/helpers/data'
import { redirect } from '@sveltejs/kit'
import { base } from '$app/paths'

export const prerender = true

export const load = async (event) => {
    let support = null

    if (event.url.pathname === `${base}/`) {
        if (event.locals.lang === 'fr')
            throw redirect(301, `${base}/accueil`)
        else
            throw redirect(301, `${base}/home`)
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