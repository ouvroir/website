/**
 * This object needs to remain in a JS file in order to be imported
 * by other JS files.
 */

/**
 * @type {Object.<string, Object<string, string>>}
 */
const abstractRoutes = {
	'/[about=about]': {
		en: '/about',
		fr: '/a-propos'
	},
	'/[news=news]': {
		en: '/news',
		fr: '/actualités'
	},

	'/[home=home]': {
		en: '/home',
		fr: '/accueil'
	},
	'/[lab=lab]': {
		en: '/the-lab',
		fr: '/le-laboratoire'
	},
	'/[projects=projects]': {
		en: '/projects',
		fr: '/projets'
	},
	'/[projects=projects]/[slug]': {
		en: '/projects',
		fr: '/projets'
	},
	'/[services=services]': {
		en: '/our-services',
		fr: '/nos-services'
	},
	'/[lab=lab]/[cr=cr]': {
		en: '/the-lab/meeting-reports',
		fr: '/le-laboratoire/comptes-rendu'
	},
	'/[lab=lab]/[team=team]': {
		en: '/the-lab/members',
		fr: '/le-laboratoire/membres'
	}
};

export default abstractRoutes;
