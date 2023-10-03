import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
	return param === 'about' || param === 'a-propos' || param === 'our-services' || param === 'nos-services'
}) satisfies ParamMatcher