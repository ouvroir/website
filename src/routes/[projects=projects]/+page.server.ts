import { importContentFrom } from '$lib/helpers/markdown'

export const load = async (event) => {
    return {
        projects: await importContentFrom('projets/', event.locals.lang)
    }
}