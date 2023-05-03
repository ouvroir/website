// import routes from '$i18n/routesLang'
import { redirect } from '@sveltejs/kit';

export const prerender = true

export const load = async (event) => {
    // console.log('[ + ] Layout locals', event.locals)
    // console.log('[ + ] Layout route', event)

    if (event.url.pathname === '/') {
        if (event.locals.lang === 'fr') {
            console.log('redirect to /accueil')
            throw redirect(307, '/accueil')
        }
        else
            throw redirect(307, '/home')
    }

    return {
        lang: event.locals.lang
    }
}