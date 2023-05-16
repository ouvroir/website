import { importContentFrom } from '$lib/helpers/markdown.js'
import type { Project } from '$lib/types/Markdown'


export const load = async (event) => {
    return {
        content: {
            projects: await importContentFrom('projets/', event.locals.lang) as Project[]
        }
    }
}