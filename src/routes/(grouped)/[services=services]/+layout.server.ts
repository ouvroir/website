import { redirect } from '@sveltejs/kit';

export const prerender = true


export const load = async (event) => {
    if (event.route.id === '/[services=services]') {
        console.log('SERVICES NEEDS TO BE REDIRECTED')
        if (event.locals.lang === 'fr')
            throw redirect(300, '/nos-services/presentation')
        else if (event.locals.lang === 'en')
            throw redirect(300, '/our-services/presentation')
    }
}


