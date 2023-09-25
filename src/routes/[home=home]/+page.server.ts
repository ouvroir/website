import { fetchData, createSlugFromFilename } from '$lib/helpers/data.js'

export const load = async (event) => {
    const projects = await fetchData(event.locals.lang, 'projects')

    let posts = await fetchData(event.locals.lang, 'blog')
    posts = posts.filter(p => p.meta !== null).map(p => {
        p.meta.type = 'blog'
        p.meta.slug = createSlugFromFilename(p.path)
        return p
    })

    let events = await fetchData(event.locals.lang, 'event')
    events = events.filter(p => p.meta !== null).map(e => {
        e.meta.type = 'event'
        e.meta.slug = createSlugFromFilename(e.path)
        return e
    })

    return {
        projects,
        posts,
        events,
    }
}