import { fetchData } from '$lib/helpers/data.js'

export const load = async (event) => {
    const posts = await fetchData(event.locals.lang, 'blog')
    console.log('POSTS', posts)
    return {
        posts: posts
    }
}