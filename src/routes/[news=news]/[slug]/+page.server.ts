import { fetchData } from "$lib/helpers/data"

export const load = async (event) => {

    // Cannot use searchParams, so parse parameter manually
    const match = event.url.href.match(/\?type=?(\w+)/)
    const type = match ? match[1] : 'blog' as 'blog' | 'event' | 'meeting'

    let post
    if (type === 'blog') {
        const posts = await fetchData(event.locals.lang, 'blog')
        post = posts.find(p => p.meta.slug === event.params.slug)
    }
    else {

        const basePath = type === 'meeting'
            ? '/src/lib/labouvroir/cr/'
            : '/src/lib/labouvroir/evenements/'
        const path = basePath + decodeURIComponent(event.params.slug) + '.md'
        const posts = await fetchData(event.locals.lang, type)
        post = posts.find(p => p.path === path)
    }

    return {
        post
    }
}