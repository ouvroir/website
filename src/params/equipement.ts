import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
    return param === 'equipement' || param === 'equipements';
}) satisfies ParamMatcher