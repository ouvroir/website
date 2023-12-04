import { fetchData } from '$lib/helpers/data.js'
import type { Blog, Event, Project } from '$lib/types'

export const load = async () => {

    const projects = await fetchData('projects') as Project[]

    let posts = await fetchData('blog') as Blog[]
    posts = posts.filter(p => p.meta !== null) as Blog[]

    let events = await fetchData('event') as Event[]
    events = events.filter(p => p.meta !== null) as Event[]

    return {
        projects,
        posts,
        events
    }
}