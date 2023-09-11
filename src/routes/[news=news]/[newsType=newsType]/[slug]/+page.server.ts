import { fetchData } from "$lib/helpers/data"

const types: { [type: string]: 'blog' | 'event' | 'meeting' } = {
    blog: 'blog',
    event: 'event',
    evenement: 'event',
    meeting: 'meeting',
    reunion: 'meeting'
}

export const load = async (event) => {
    const type = types[event.params.newsType]

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