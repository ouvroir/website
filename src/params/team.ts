import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
	return param === 'team' || param === 'equipe';
}) satisfies ParamMatcher