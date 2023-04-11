import type { ParamMatcher } from '@sveltejs/kit';


export const match = ((param) => {
  return (param === 'events' || param === 'evenements')
}) satisfies ParamMatcher