import { redirect } from '@sveltejs/kit'
import { get } from 'svelte/store'
import { locale } from '$i18n/i18n'

export const load = () => {
    if (get(locale) == 'en')
        throw redirect(307, `/home`)
    else
        throw redirect(307, `/accueil`)
}