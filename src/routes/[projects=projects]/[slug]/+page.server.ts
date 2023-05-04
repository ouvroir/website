import { readFileSync } from 'fs'
import { default as fm } from 'front-matter';
import showdown from 'showdown'
import contentMeta from '$i18n/meta/contentMeta.json'
import type { Markdown, ContentMeta } from '$lib/types/Markdown';


export const load = async (event) => {
    const content = contentMeta as unknown as ContentMeta
    const converter = new showdown.Converter()
    const filename = content[event.locals.lang].projects
        .filter(o => o.slug === event.params.slug)[0].filename

    const md = fm(readFileSync(filename, { encoding: 'utf-8' })) as Markdown


    console.log('Porject load function is (re)running with data')
    console.log(`${md.attributes.title} - ${md.attributes.lang}`)

    return {
        post: {
            attributes: md.attributes,
            html: converter.makeHtml(md.body)
        }
    }
}