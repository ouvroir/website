import { describe, it, expect } from 'vitest';
import { abstractRoutes } from '$i18n/routesLangMap'

import { match as aboutMatch } from '../params/about'
import { match as eventsMatch } from '../params/events'
import { match as homeMatch } from '../params/home'
import { match as labMatch } from '../params/lab'
import { match as projectsMatch } from '../params/projects'
import { match as servicesMatch } from '../params/services'
import { match as teamMatch } from '../params/team'


// TODO: Should verify if all param matchers are tested

describe('test param Matchers', () => {
    const matchers = {
        '/[about=about]': aboutMatch,
        '/[events=events]': eventsMatch,
        '/[home=home]': homeMatch,
        '/[lab=lab]': labMatch,
        '/[projects=projects]': projectsMatch,
        '/[services=services]': servicesMatch,
        '/[team=team]': teamMatch,
    }

    Object.keys(abstractRoutes).forEach(k => {
        Object.keys(abstractRoutes[k]).forEach(lang => {
            it(`test ${k} param ${lang}`, () => {
                expect(matchers[k](abstractRoutes[k][lang].slice(1))).toBe(true)
            })
        })
    })

})