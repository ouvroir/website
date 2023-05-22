import contentMeta from '$i18n/meta/contentMeta.json'
import type { Markdown, ContentMeta } from '$lib/types/Markdown';


export const load = async (event) => {
    try {
        const content = contentMeta as unknown as ContentMeta
        let filename = content[event.locals.lang as 'en' | 'fr'].projects
            .filter(o => o.slug === event.params.slug)[0].filename

        filename = filename.split('/').at(-1) as string

        const relPath = '../../../lib/labouvroir/projets/'

        const md = await import(/* @vite-ignore */ relPath + filename)

        return {
            post: {
                ...md.metadata,
                ...md.default.render()
            }
        }
    }
    catch {
        console.log('hello')
    }
}

