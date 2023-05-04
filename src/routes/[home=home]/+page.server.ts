import contentMeta from '$i18n/meta/contentMeta.json'
import type { ContentMeta } from "$lib/types/Markdown";

export const load = async (event) => {
    const content = contentMeta as unknown as ContentMeta
    return {
        content: content[event.locals.lang]
    }
}