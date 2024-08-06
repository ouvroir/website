import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';
import { get } from 'svelte/store';
import { building } from '$app/environment';
import { fetchData } from '$lib/utils/data';
import { locale } from '$i18n/i18n';
import { contentLoaded } from '$lib/stores.js';
import type { Blog, Member, Project, Event, Meeting, StaticDocument } from '$lib/types.js';

export const prerender = true;

export const load = async (event) => {
    if (event.url.pathname === `${base}/` || event.url.pathname === `/`) {
        if (get(locale) === 'fr') throw redirect(301, `${base}/accueil`);
        else throw redirect(301, `${base}/home`);
    }

    if (building) {
        console.log('[layout.build] fetching', event.url.pathname);
    }

    if (!get(contentLoaded)) {
        const allProjects = fetchData('projects') as Project[];
        const allMembers = fetchData('members') as Member[];
        const allEvents = fetchData('events') as Event[];
        const allBlogs = fetchData('blog') as Blog[];
        const meetings = fetchData('meetings') as Meeting[];
        const allServices = fetchData('services') as StaticDocument[];
        const allAbouts = fetchData('about') as StaticDocument[];
        const allPresentations = fetchData('presentation') as StaticDocument[];
        const allSupports = fetchData('support') as StaticDocument[];
        return {
            allBlogs,
            allEvents,
            meetings,
            allMembers,
            allProjects,
            allServices,
            allAbouts,
            allPresentations,
            allSupports
        };
    }
    else return null;
};
