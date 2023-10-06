import { fetchData } from "$lib/helpers/data.ts"
import type { Member } from "$lib/types.d.ts"


export const load = async (event) => {
    let file
    let team: Member[] = []

    if (event.url.pathname === '/about' || event.url.pathname === '/a-propos') {
        team = await fetchData('team')
        file = await fetchData('about')
    } else {
        file = await fetchData('services')
    }

    return {
        doc: file,
        team: team,
    }
}