import { importContentFrom } from '$lib/helpers/markdown.js'


export const load = async () => {
    return {
        meetings: await importContentFrom('cr/', null)
    }
}