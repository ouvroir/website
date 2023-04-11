import type { ParamMatcher } from '@sveltejs/kit';


export const match = ((param) => {
	return param === 'projects' || param === 'projets';
}) satisfies ParamMatcher
