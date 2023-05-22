import { importContentFrom } from '$lib/helpers/markdown.js'
import type { Project } from '$lib/types/Markdown'


export const load = async (event) => {
    const efiles = import.meta.glob('./events/*.md')
    const events = await Promise.all(
        Object.entries(efiles).map(async ([_, resolver]) => {
            const e = await resolver()
            return {
                ...e.metadata,
                ...e.default.render()
            }
        })
    )

    return {
        content: {
            projects: await importContentFrom('projets/', event.locals.lang) as Project[],
            events: await events
        }
    }
}

