import { describe, it, expect } from 'vitest';
import translations from '$lib/i18n/translations';
import { translate } from '$i18n/i18n'
import { abstractRoutes, getRedirectRoute, getLangFromSlug } from '$i18n/routesLangMap'



describe('i18n checks', () => {
    it('same number of items in translations', () => {
        const ls = Object.keys(translations).map(l => Object.keys(translations[l]).length)
        expect(ls.every(l => l === ls[0])).toEqual(true)
    })

    it('test single translation', () => {
        expect(translate('en', 'aria.home.title', {})).toEqual("Lab Ouvroir's homepage")
    })

    it('test routesLangMap')
})


// describe('routesLangMap checks', () => {
//     const routes: { [path: string]: string } = {}
//     Object.keys(abstractRoutes).forEach(slug => {
//         Object.keys(abstractRoutes[slug]).forEach(lang => {
//             routes[abstractRoutes[slug][lang]] = lang
//         })
//     })
// })