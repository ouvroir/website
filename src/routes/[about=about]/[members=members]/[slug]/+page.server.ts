import { fetchData } from '$lib/helpers/data.js'

export const load = async ({ params, locals }) => {

    const members = await fetchData(locals.lang, 'team')
    const member = members.find(member => member.meta.slug === params.slug)

    return {
        member
    }
}