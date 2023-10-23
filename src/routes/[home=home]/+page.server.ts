import { fetchData, createSlugFromFilename } from '$lib/helpers/data.js'

export const load = async () => {

    const projects = await fetchData('projects')

    let posts = await fetchData('blog')
    posts = posts.filter(p => p.meta !== null).map(p => {
        p.meta.type = 'blog'
        p.meta.slug = createSlugFromFilename(p.meta.path)
        return p
    })

    let events = await fetchData('event')
    events = events.filter(p => p.meta !== null).map(e => {
        e.meta.type = 'event'
        e.meta.slug = createSlugFromFilename(e.meta.path)
        return e
    })

    return {
        projects,
        posts,
        events,
    }
}