import { describe, it, expect } from 'vitest';
import abstractRoutes from '$i18n/abstractRoutes'

import { match as aboutMatch } from '../params/about'
import { match as eventsMatch } from '../params/events'
import { match as homeMatch } from '../params/home'
import { match as labMatch } from '../params/lab'
import { match as projectsMatch } from '../params/projects'
import { match as servicesMatch } from '../params/services'
import { match as teamMatch } from '../params/team'

describe('test param Matchers', () => {
    const matchers: { [abstractSlug: string]: (param: string) => boolean } = {
        '/[about=about]': aboutMatch,
        '/[events=events]': eventsMatch,
        '/[home=home]': homeMatch,
        '/[lab=lab]': labMatch,
        '/[projects=projects]': projectsMatch,
        '/[services=services]': servicesMatch,
        '/[lab=lab]/[team=team]': teamMatch,
    }

    // Test if param matchers accept localized slug defined
    // in routesLangMap.ts
    Object.keys(abstractRoutes).forEach(k => {
        Object.keys(abstractRoutes[k]).forEach(lang => {
            it(`test ${k} param ${lang}`, () => {
                const slug = abstractRoutes[k][lang].split('/').at(-1) as string
                expect(matchers[k](slug)).toBe(true)
            })
        })
    })

})