import { fetchData, createSlugFromFilename } from '$lib/helpers/data.js'



export const load = async (event) => {
    let posts = await fetchData(event.locals.lang, 'blog')
    posts = posts.map(post => {
        post.meta.type = 'blog'
        post.meta.slug = createSlugFromFilename(post.path)
        return post
    })

    let events = await fetchData(event.locals.lang, 'event')
    events = events.map(event => {
        event.meta.type = 'event'
        event.meta.slug = createSlugFromFilename(event.path)
        return event
    })

    let meetings = await fetchData(event.locals.lang, 'meeting')
    meetings = meetings.map(meeting => {
        meeting.meta.type = 'meeting'
        meeting.meta.slug = createSlugFromFilename(meeting.path)
        return meeting
    })

    return {
        news: [...posts, ...events, ...meetings]
    }
}