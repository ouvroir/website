import contentMeta from '$i18n/meta/contentMeta.json'
import type { ContentMeta } from '$lib/types/Markdown';


export const load = async (event) => {
    const content = contentMeta as ContentMeta
    return {
        projects: content.projects[event.locals.lang]
    }
}