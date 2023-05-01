import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
    return param === 'members' || param === 'membres';
}) satisfies ParamMatcher
