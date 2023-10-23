import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
	return param === 'about' || param === 'a-propos'
}) satisfies ParamMatcher