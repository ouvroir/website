import abstractRoutes from "./abstractRoutes"
import contentMeta from './meta/contentMeta.json'
import type { ContentMeta } from "$lib/types/Markdown"

export const localizedRoutes = (() => {
    const routes: string[] = []
    Object.keys(abstractRoutes).forEach(k => {
        Object.keys(abstractRoutes[k]).forEach(l => routes.push(abstractRoutes[k][l]))
    })
    // console.log('localized routes', routes)
    return routes
})()


function translatePojectSlug(slug: string, to: string) {
    const content = contentMeta as ContentMeta
    const from = to === 'en' ? 'fr' : 'en'

    let filename = content.projects[from].filter(o => o.slug === slug)[0].filename
    filename = filename.replace(from, to)

    const nslug = content.projects[to].filter(o => o.filename === filename)[0].slug
    return nslug
}

/**
 * Function that generate redrect route depending on abstract slug and destination lang
 * @param {string} slug Define slug page (note localized)
 * @param {string} to Define lang destination
 */
export const getRedirectRoute = (abstractSlug: string, slug: string, to: string): string => {
    let route = abstractRoutes[abstractSlug][to]

    console.log(abstractSlug)
    console.log(slug)

    if (abstractSlug.includes('[slug]')) {
        if (abstractSlug.includes('projects')) {
            route += '/' + translatePojectSlug(slug.split('/').at(-1) as string, to)
        }
    }

    if (!route) throw new Error(`could not find url for ${slug}`)
    return route
}

export const getLangFromSlug = (abstractSlug: string, slug: string): string => {
    // console.log('\n ABSTRACT SLUG', abstractSlug)
    // console.log('SLUG', slug)
    // console.log('ABSTRACT SLUG \n', abstractRoutes[abstractSlug])

    const routes = abstractRoutes[abstractSlug]

    if (slug === '/[fallback]') return 'en'
    if (slug.includes(routes['en']))
        return 'en'
    else return 'fr'
}

