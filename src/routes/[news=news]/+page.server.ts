import { fetchData } from '$lib/helpers/data.js'
import type { Blog, Event, Meeting } from '$lib/types'

export const load = async () => {
    const posts = await fetchData('blog') as Blog[]
    const events = await fetchData('event') as Event[]
    const meetings = await fetchData('meeting') as Meeting[]

    return {
        news: [...posts, ...events],
        meetings
    }
}