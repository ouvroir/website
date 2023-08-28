import { base } from "$app/paths"


const translations: { [locale: string]: { [path: string]: string } } = {
    'en': {
        // ARIA labels
        'aria.home.title': "Homepage",
        'aria.nav.label': 'main navigation',
        'aria.locales.label': 'language menu',
        'aria.locales.fr': 'french',
        'aria.locales.en': 'english',
        'aria.projects.carousel': 'projects carousel',

        // svelte:head
        'head.home': 'Ouvroir',
        'head.news': 'News',
        'head.projects': 'Projects',
        'head.services': 'Our services',
        'head.about': 'About Ouvroir',


        // Header
        'header.subtitle': 'a <span class="clr:red">digital</span> art history and museology lab.',
        'header.description': "L’Ouvroir is a Digital Art History and Museology lab at the Université de Montréal dedicated to support the work conducted within the framework of the Partnership « New Uses of Collections in Art Museums »",

        // Navigation bar
        'nav.home': 'Home',
        'nav.news': 'News',
        'nav.projects': 'Projects',
        'nav.services': 'Services',
        'nav.about': 'About',

        'nav.locale.label': 'Language',

        // URLs
        'route.home': `${base}/home`,
        'route.news': `${base}/news`,
        'route.projects': `${base}/projects`,
        'route.services': `${base}/our-services`,
        'route.about': `${base}/about`,
        'route.about.presentation': `${base}/about/presentation`,
        'route.about.team': `${base}/about/members`,
        'route.about.coc': `${base}/about/code-of-conduct`,
        'route.services.presentation': `${base}/our-services/presentation`,
        'route.services.equipement': `${base}/our-services/equipement`,
        'route.services.reservation': `${base}/our-services/reservation`,
        'route.services.meetups': `${base}/our-services/meet-ups`,

        // Homepage
        'home.projects.title': 'Latest projects & publications',
        'home.events.title': 'Upcoming events',

        // About
        'about.title': 'About',
        'about.presentation': 'Presentation',
        'about.coc': 'Code of conduct',
        'about.support': 'Financial support',
        'about.team': 'Members',
        'about.team.dir_sc': 'Scientific direction',
        'about.team.coord': 'Coordination',
        'about.team.members': 'Members',
        'about.team.pronouns': 'Pronoun(s)',
        'about.team.homepage': 'Homepage',
        'about.team.contributor': 'Contributor',

        // Services
        'services.title': 'Our services',
        'services.presentation': 'Presentation',
        'services.meetups': 'Meet-ups',
        'services.equipement': 'Equipement',
        'services.reservation': 'Reservation',
        'services.coc': 'Code of conduct',

        // News
        'news.summary': 'Summary',
        'news.register': 'Register',
        'news.speaker': 'Speaker·s',

        // Events
        'events.title': "Our events",

        // Error
        'error.title': "Oups! The page your asking for cannot be find.",

        // UI
        'ui.btt': 'Back to top',
        'card.blog': 'Blog',
        'card.event': 'Event',
        'card.meeting': 'Meeting notes',
        'card.speaker': 'speaker·s',
    },
    'fr': {
        // ARIA labels
        'aria.home.title': "Accueil",
        'aria.projects.title': 'Projets',
        'aria.blog.title': 'Blog',
        'aria.about.title': 'À propos',
        'aria.team.title': 'Membres',
        'aria.events.title': 'Événements',
        'aria.nav.label': 'navigation principale',
        'aria.locales.label': 'menu langues',
        'aria.locales.fr': 'français',
        'aria.locales.en': 'anglais',
        'aria.projects.carousel': 'carousel des projets',

        // svelte:head
        'head.home': 'Ouvroir',
        'head.news': 'Actualités',
        'head.projects': 'Projets',
        'head.services': 'Nos services',
        'head.about': 'À propos',

        // Header
        'header.subtitle': 'd’histoire de l’art et de muséologie <span class="clr:red">numériques</span>.',
        'header.description': "L’Ouvroir d’histoire de l’art et de muséologie numérique de l’Université de Montréal, est un laboratoire de recherche destiné à soutenir le travail conduit dans le cadre du Partenariat « Des nouveaux usages des collections dans les musées d’art »",

        // Navigation bar
        'nav.home': 'Accueil',
        'nav.news': 'Actualités',
        'nav.projects': 'Projets',
        'nav.services': 'Services',
        'nav.about': 'À propos',
        'nav.locale.label': 'Langue',

        // URLs
        'route.home': `${base}/accueil`,
        'route.news': `${base}/actualites`,
        'route.projects': `${base}/projets`,
        'route.services': `${base}/nos-services`,
        'route.about': `${base}/a-propos`,
        'route.about.presentation': `${base}/a-propos/presentation`,
        'route.about.team': `${base}/a-propos/membres`,
        'route.about.coc': `${base}/a-propos/code-de-conduite`,
        'route.services.presentation': `${base}/nos-services/presentation`,
        'route.services.equipement': `${base}/nos-services/equipements`,
        'route.services.reservation': `${base}/nos-services/reservation`,
        'route.services.meetups': `${base}/nos-services/rencontres`,

        // Homepage
        'home.projects.title': 'Projets & publications',
        'home.events.title': 'Nos événements',

        // About
        'about.title': 'À propos',
        'about.presentation': 'Présentation',
        'about.coc': 'Code de conduite',
        'about.support': 'Financements',
        'about.team': 'Membres',
        'about.team.dir_sc': 'Direction scientifique',
        'about.team.coord': 'Coordination',
        'about.team.members': 'Membres',
        'about.team.pronouns': 'Pronom(s)',
        'about.team.homepage': 'Page personnelle',
        'about.team.contributor': 'Contributeur⸱rice',

        // Services
        'services.title': 'Nos services',
        'services.presentation': 'Présentation',
        'services.equipement': 'Équipements',
        'services.reservation': 'Réservations',
        'services.meetups': 'Rencontres',
        'services.coc': 'Code de conduite',

        // News
        'news.summary': 'Résumé',
        'news.register': 'Inscription',
        'news.speaker': 'Conférencier·ère·s',

        // Events
        'events.title': "Nos évenements",

        // Error
        'error.title': "Oups! La page demandée n'a pas pu être retrouvée.",

        // UI
        'ui.btt': 'Haut de la page',
        'card.blog': 'Blog',
        'card.event': 'Événement',
        'card.meeting': 'Compte-rendu',
        'card.speaker': 'conférencier·ère·s',
    }
}

export default translations

