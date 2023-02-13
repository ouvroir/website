/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
	return param === 'about' || param === 'a-propos';
}
