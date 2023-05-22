import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
    return param === 'news' || param === 'actualites';
}) satisfies ParamMatcher