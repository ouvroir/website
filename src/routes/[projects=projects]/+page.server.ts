import { fetchData } from '$lib/helpers/data';


export const load = async ({ locals }) => {
    return {
        projects: await fetchData(locals.lang, 'projects')
    };
}