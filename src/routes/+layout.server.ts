import { fetchData } from '$lib/helpers/data'
import { redirect } from '@sveltejs/kit'
import { base } from '$app/paths'
import { get } from 'svelte/store'
import { locale } from '$i18n/i18n'


export const prerender = true

export const load = async (event) => {

    let support = null

    if (event.url.pathname === `${base}/` || event.url.pathname === `/`) {
        if (get(locale) === 'fr')
            throw redirect(301, `${base}/accueil`)
        else
            throw redirect(301, `${base}/home`)
    }

    if (event.route.id && (
        event.route.id.includes('home') ||
        event.route.id.includes('about'))) {

        support = await fetchData('support')
    }

    return {
        support,
    }
}