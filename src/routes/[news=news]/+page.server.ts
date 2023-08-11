import { fetchData } from '$lib/helpers/data.js'

export const load = async (event) => {
    let posts = await fetchData(event.locals.lang, 'blog')
    posts = posts.map(post => {
        post.meta.type = 'blog'
        return post
    })

    let events = await fetchData(event.locals.lang, 'event')
    events = events.map(event => {
        event.meta.type = 'event'
        return event
    })

    let meetings = await fetchData(event.locals.lang, 'cr')
    meetings = meetings.map(meeting => {
        meeting.meta.type = 'meeting'
        return meeting
    })


    return {
        news: [...posts, ...events, ...meetings]
    }
}