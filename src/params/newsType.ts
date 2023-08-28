import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
	return param === 'event' ||
		param === 'evenement' ||
		param === 'meeting' ||
		param === 'reunion' ||
		param === 'blog';
}) satisfies ParamMatcher