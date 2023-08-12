import { redirect } from '@sveltejs/kit'

export const load = (event) => {
    if (event.locals.lang && event.locals.lang == 'en')
        throw redirect(307, `/home`)
    else
        throw redirect(307, `/accueil`)
}