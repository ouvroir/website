import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
	return param === 'AliceTruc' ||
		param === 'emchateau' ||
		param === 'gdJESS' ||
		param === 'ktanton' ||
		param === 'LeaMaronet' ||
		param === 'lenamk' ||
		param === 'talithamotter' ||
		param === 'williamdiakite' ||
		param === 'ZoeRenaudie'
}) satisfies ParamMatcher