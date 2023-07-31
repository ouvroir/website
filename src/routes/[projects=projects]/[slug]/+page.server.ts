import { fetchData } from '$lib/helpers/data';

export const load = async (event) => {
    const projects = await fetchData(event.locals.lang, 'projects')
    const project = projects.find(p => p.meta.slug === event.params.slug)

    return {
        ...project
    }
};