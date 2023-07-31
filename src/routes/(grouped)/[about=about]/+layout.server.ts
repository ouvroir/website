import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
    if (event.route.id === '/[about=about]')
        if (event.locals.lang === 'fr')
            throw redirect(300, '/a-propos/presentation')
        else
            throw redirect(300, '/about/presentation')
}