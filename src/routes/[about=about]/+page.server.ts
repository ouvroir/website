import { fetchData } from "$lib/helpers/data.ts"
import type { Member } from "$lib/types.d.ts"

export const load = async (event) => {
    let file
    let team: Member[] | null = null

    if (event.url.pathname === '/about' || event.url.pathname === '/a-propos') {
        team = await fetchData(event.locals.lang, 'team')
        file = await fetchData(event.locals.lang, 'about')
    } else {
        file = await fetchData(event.locals.lang, 'services')
    }


    return {
        html: file ? file[0].html : '',
        meta: file ? file[0].meta : {},
        team: team,
    }
}