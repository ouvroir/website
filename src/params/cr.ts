import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
    return param === 'comptes-rendu' || param === 'reports';
}) satisfies ParamMatcher