import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
	return param === 'resources' || param === 'ressources';
}) satisfies ParamMatcher