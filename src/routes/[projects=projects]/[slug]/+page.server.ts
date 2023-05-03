import { readFileSync } from 'fs'
import { default as fm } from 'front-matter';
import showdown from 'showdown'
import contentMeta from '$i18n/meta/contentMeta.json'
import type { Markdown, ContentMeta } from '$lib/types/Markdown';


export const load = async (event) => {
    const content = contentMeta as ContentMeta
    const converter = new showdown.Converter()
    const filename = content.projects[event.locals.lang]
        .filter(o => o.slug === event.params.slug)[0].filename

    const md = fm(readFileSync(filename, { encoding: 'utf-8' })) as Markdown

    return {
        post: {
            attr: md.attributes,
            html: converter.makeHtml(md.body)
        }
    }
}