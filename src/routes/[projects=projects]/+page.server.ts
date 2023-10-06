import { fetchData } from '$lib/helpers/data';

export const load = async () => {
    return {
        projects: await fetchData('projects')
    };
}