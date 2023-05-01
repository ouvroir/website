import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
    return param === 'home' || param === 'accueil';
}) satisfies ParamMatcher