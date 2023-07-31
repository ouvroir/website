import { fetchData } from '$lib/helpers/data.js'

export const load = async (event) => {
    const projects = await fetchData(event.locals.lang, 'projects')
    const posts = await fetchData(event.locals.lang, 'blog')
    const events = await fetchData(event.locals.lang, 'event')
    return {
        projects,
        posts,
        events,
    }
}