import { fetchData } from '$lib/helpers/data';
import type { Project } from '$lib/types';

export const load = async () => {
    return {
        projects: await fetchData('projects') as Project[]
    };
}