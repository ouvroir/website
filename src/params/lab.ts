import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
    return param === 'the-lab' || param === 'le-laboratoire';
}) satisfies ParamMatcher