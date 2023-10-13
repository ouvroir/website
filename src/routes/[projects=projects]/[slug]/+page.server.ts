import { fetchData } from '$lib/helpers/data';


export const load = async (event) => {
    let projects = await fetchData('projects')
    projects = projects.filter(p => p.meta.slug === event.params.slug)

    return {
        projects
    }
};