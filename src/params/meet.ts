import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
    return param === 'meet-ups' || param === 'se-rencontrer';
}) satisfies ParamMatcher