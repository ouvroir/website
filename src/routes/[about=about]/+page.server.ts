import { readFileSync } from 'fs'
import showdown from 'showdown'

/**
 * TODO: remove hard-coded handling of missing translation
 */
export const load = async (event) => {
    let html: string
    const converter = new showdown.Converter()
    if (event.locals.lang === 'fr') {
        const body = readFileSync('./src/lib/labouvroir/about.md', { encoding: 'utf-8' })
        html = converter.makeHtml(body)
    }
    else {
        const body = "## Oups, \nThis page has not been translated yet."
        html = converter.makeHtml(body)
    }
    return {
        html
    }
}