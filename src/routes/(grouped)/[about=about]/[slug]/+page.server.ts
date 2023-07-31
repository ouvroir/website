import { fetchData } from "$lib/helpers/data.ts"
import { Member } from "$lib/types.d.ts"

export const load = async (event) => {

    const team: Member[] = await fetchData(event.locals.lang, 'team')
    let file = null
    if (event.params.slug === 'code-of-conduct' || event.params.slug === 'code-de-conduite')
        file = await fetchData(event.locals.lang, 'coc')
    else if (event.params.slug === 'presentation')
        file = await fetchData(event.locals.lang, 'about')


    return {
        html: file ? file[0].html : '',
        team: team,
    }
}