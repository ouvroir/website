import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
    return param === 'our-services' || param === 'nos-services';
}) satisfies ParamMatcher