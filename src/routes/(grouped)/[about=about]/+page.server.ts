import { fetchData } from "$lib/helpers/data.ts"


export const load = async () => {

    return {
        doc: await fetchData('about'),
        team: await fetchData('team'),
    }
}