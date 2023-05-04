import type { ContentMeta } from '$lib/types/Markdown';
import contentMeta from '$i18n/meta/contentMeta.json'

export const load = async (event) => {
    const content = contentMeta as unknown as ContentMeta
    return {
        projects: content[event.locals.lang].projects
    }
}