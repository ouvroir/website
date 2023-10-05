import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
	return param === 'membres' || param === 'members';
}) satisfies ParamMatcher