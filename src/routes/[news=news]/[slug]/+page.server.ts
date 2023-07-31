import { fetchData } from "$lib/helpers/data"

export const load = async ({ locals, params }) => {
    const posts = await fetchData(locals.lang, 'blog')
    const post = posts.find(p => p.meta.slug === params.slug)


    return {
        post
    }
}