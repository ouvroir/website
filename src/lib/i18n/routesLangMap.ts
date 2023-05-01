
export const abstractRoutes: { [abs: string]: { [lang: string]: string } } = {
    '/[about=about]': {
        'en': '/about',
        'fr': '/a-propos'
    },
    '/[events=events]': {
        'en': '/events',
        'fr': '/evenements'
    },
    '/[home=home]': {
        'en': '/home',
        'fr': '/accueil'
    },
    '/[lab=lab]': {
        'en': '/the-lab',
        'fr': '/le-laboratoire'
    },
    '/[projects=projects]': {
        'en': '/projects',
        'fr': '/projets'
    },
    '/[services=services]': {
        'en': '/our-services',
        'fr': '/nos-services'
    },
    '/[team=team]': {
        'en': '/members',
        'fr': '/membres'
    },
}

/**
 * Function that generate redrect route depending on abstract slug and destination lang
 * @param {string} slug Define slug page (note localized)
 * @param {string} to Define lang destination
 */
export const getRedirectRoute = (slug: string, to: string): string => {
    try {
        abstractRoutes[slug][to]
    }
    catch (e) {
        throw new Error(`could not find url for ${slug}`)
    }
    finally {
        return '/erro'
    }
}

export const getLangFromSlug = (abstractSlug: string, slug: string): string => {
    const routes = abstractRoutes[abstractSlug]
    if (routes['en'] === slug)
        return 'en'
    else return 'fr'
}
