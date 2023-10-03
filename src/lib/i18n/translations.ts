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
        'header.description': "L’Ouvroir is a Digital Art History and Museology lab at the Université de Montréal dedicated to support the work conducted within the framework of the Partnership «&nbspNew Uses of Collections in Art Museums&nbsp»",

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
        'home.news.latest': 'Latest news',
        'home.news.all': 'All news',
        'home.projects.highlight': 'Highlighted projects',
        'home.projects.all': 'All projects',
        'home.services.title': 'In support of the student and faculty communities at the University of Montreal, Ouvroir offers several services',
        'home.services.equipement.title': 'Borrowing equipment',
        'home.services.equipement': 'Ouvroir provides state-of-the-art equipment for digitization, audio-visual recording, and collaborative work.',
        'home.services.equipement.cta': 'See available equipment',
        'home.services.reservation.title': 'Office and meeting room reservation',
        'home.services.reservation': 'Office desks and meeting rooms are available for individual or team work.',
        'home.services.reservation.cta': 'Book a space',
        'home.services.meetups.title': 'Meet ups',
        'home.services.meetups': 'Many events are organized to help you with work in digital environments.',
        'home.services.meetups.cta': 'Get in touch',

        // About
        'about.title': 'About',
        'about.presentation': 'Presentation',
        'about.coc': 'Code of conduct',
        'about.support': 'Financial support',
        'about.team': 'Ouvroir members',
        'about.team.dir_sc': 'Scientific direction',
        'about.team.coord': 'Coordination',
        'about.team.members': 'Members',
        'about.team.pronouns': 'Pronoun(s)',
        'about.team.homepage': 'Homepage',
        'about.team.contributor': 'Contributor',

        // Services
        'services.title': 'Our services',
        'services.presentation': 'Presentation',
        'services.meetups': 'Meet ups',
        'services.equipement': 'Equipement',
        'services.reservation': 'Booking',
        'services.coc': 'Code of conduct',

        // News
        'news.summary': 'Summary',
        'news.register': 'Register',
        'news.speaker': 'Speaker·s',
        'news.type.blog': 'blog',
        'news.type.event': 'event',
        'news.type.meeting': 'meeting',

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
        'header.description': "L’Ouvroir d’histoire de l’art et de muséologie numérique de l’Université de Montréal est un laboratoire de recherche destiné à soutenir le travail conduit dans le cadre du Partenariat «&nbspDes nouveaux usages des collections dans les musées d’art&nbsp»",

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
        'home.projects.title': 'Projets à l’affiche',
        'home.events.title': 'Nos événements',
        'home.news.latest': 'Dernières nouvelles',
        'home.news.all': "Toute l’actualité",
        'home.projects.all': 'Tous les projets',
        'home.services.title': 'En soutien aux communautés étudiantes et professorales de l’Université de Montréal, l’Ouvroir offre plusieurs services',
        'home.services.equipement.title': 'Prêt de matériel',
        'home.services.equipement': 'L’ouvroir met à disposition de l’équipement de pointe pour la numérisation, l’enregistrement audio-visuel et le travail collaboratif.',
        'home.services.equipement.cta': 'Voir tout l’équipement disponible',
        'home.services.reservation.title': 'Réservation de salle',
        'home.services.reservation': 'Des locaux sont à disposition pour le travail individuel ou en groupe.',
        'home.services.reservation.cta': 'Réserver un espace',
        'home.services.meetups.title': 'Rencontres',
        'home.services.meetups': 'De nombreux événements sont organisés pour vous aider le travail en environnements numériques.',
        'home.services.meetups.cta': 'Nous rencontrer',

        // About
        'about.title': 'À propos',
        'about.presentation': 'Présentation',
        'about.coc': 'Code de conduite',
        'about.support': 'Financements',
        'about.team': 'Les membres de l’Ouvroir',
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
        'news.type.blog': 'blog',
        'news.type.event': 'evenement',
        'news.type.meeting': 'reunion',

        // Events
        'events.title': "Nos évenements",

        // Error
        'error.title': "Oups! La page demandée n’a pas pu être retrouvée.",

        // UI
        'ui.btt': 'Haut de la page',
        'card.blog': 'Blog',
        'card.event': 'Événement',
        'card.meeting': 'Compte-rendu',
        'card.speaker': 'conférencier·ère·s',
    }
}

export default translations

