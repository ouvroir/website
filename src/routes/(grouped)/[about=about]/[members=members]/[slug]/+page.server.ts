import { fetchData } from '$lib/helpers/data.js'
import type { Member } from '$lib/types.js'

export const load = async ({ params }) => {
    const members = await fetchData('team') as Member[]
    const member = members.filter(member => member.meta.slug === params.slug)
    return {
        member
    }
}