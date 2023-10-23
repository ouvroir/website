import { fetchData, createSlugFromFilename } from '$lib/helpers/data.js'

export const load = async () => {
    let posts = await fetchData('blog')
    posts = posts.map(post => {
        post.meta.type = 'blog'
        post.meta.slug = createSlugFromFilename(post.meta.path)
        return post
    })

    let events = await fetchData('event')
    events = events.map(event => {
        event.meta.type = 'event'
        event.meta.slug = createSlugFromFilename(event.meta.path)
        return event
    })

    let meetings = await fetchData('meeting')
    meetings = meetings.map(meeting => {
        meeting.meta.type = 'meeting'
        meeting.meta.slug = createSlugFromFilename(meeting.meta.path)
        return meeting
    })

    console.log('found', meetings.length, 'meetings')

    return {
        news: [...posts, ...events],
        meetings
    }
}