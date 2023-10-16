import { fetchData } from '$lib/helpers/data.js'

export const load = async ({ params }) => {
    const members = await fetchData('team')
    const member = members.filter(member => member.meta.slug === params.name)
    return {
        member
    }
}