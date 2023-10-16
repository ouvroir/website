import { fetchData } from '$lib/helpers/data';
import type { Project } from '$lib/types.js';

export const load = async (event) => {
    let projects: Project[] = await fetchData('projects')
    projects = projects.filter(p => p.meta.slug === event.params.slug)

    return {
        projects
    }
};