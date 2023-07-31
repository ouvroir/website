import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
	return param === 'code-de-conduite' || param === 'code-of-conduct';
}) satisfies ParamMatcher