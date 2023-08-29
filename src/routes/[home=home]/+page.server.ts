import { fetchData } from '$lib/helpers/data.js'

export const load = async (event) => {
    const projects = await fetchData(event.locals.lang, 'projects')

    let posts = await fetchData(event.locals.lang, 'blog')
    posts = posts.map(p => {
        if (!p.meta) console.log('DEBUG HOME POSTS', p)
        p.meta.type = 'blog'
        return p
    })

    let events = await fetchData(event.locals.lang, 'event')
    events = events.map(e => {
        if (!e.meta) console.log('DEBUG HOME EVENTS', e)
        e.meta.type = 'event'
        return e
    })

    return {
        projects,
        posts,
        events,
    }
}