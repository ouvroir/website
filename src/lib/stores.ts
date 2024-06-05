import { writable, derived } from "svelte/store";
import type { Blog, Event, Meeting, Member, Project, StaticDocument } from "./types";
import { locale } from '$i18n/i18n'
import FlexSearch from "flexsearch";

export const showPresentation = writable(true);

export const stickyActivated = writable(false);

export const memberExpaned = writable('');

export const screenWidth = writable(1200 as number | undefined)
export const screenType = derived(screenWidth, ($screenWidth) => {
    if (!$screenWidth) return 'desktop';
    if ($screenWidth <= 480) return 'mobile';
    else if ($screenWidth >= 481 && $screenWidth <= 820) return 'tablet-vertical';
    else if ($screenWidth >= 821 && $screenWidth <= 1024) return 'tablet-horizontal';
    else return 'desktop';
})

export const smallScreen = derived(screenType, ($screenType) => {
    return $screenType === 'mobile' || $screenType === 'tablet-vertical';
})

export const showNavMenu = writable(false);

export const aboutPageTitle = writable('');

export const translatedSlug = writable('')


// --- Content stores

export const contentLoaded = writable(false);

export const meetings = writable([] as Meeting[]);

function createContentStrore<T>(data: T[]) {
    const { subscribe, set, update } = writable(data);

    return {
        subscribe,
        set,
        update,
        get: (locale: string) => subscribe((content) => content.filter(c => c.meta.path.includes(`-${locale}.md`)))
    }
}

export const allBlogs = writable([] as Blog[]);
export const blogs = derived([locale, allBlogs], ([$locale, $allBlogs]) => {
    return $allBlogs.filter(blog => blog.meta.path.includes(`-${$locale}.md`));
})

export const allEvents = writable([] as Event[]);
export const events = derived([locale, allEvents], ([$locale, $allEvents]) => {
    return $allEvents.filter(event => event.meta.path.includes(`-${$locale}.md`));
})

export const allMembers = writable([] as Member[]);
export const members = derived([locale, allMembers], ([$locale, $allMembers]) => {
    return $allMembers.filter(member => member.meta.path.includes(`-${$locale}.md`));
})

export const allProjects = writable([] as Project[]);
export const projects = derived([locale, allProjects], ([$locale, $allProjects]) => {
    return $allProjects.filter(project => project.meta.path.includes(`-${$locale}.md`));
})

export const allAbout = writable([] as StaticDocument[]);
export const about = derived([locale, allAbout], ([$locale, $allAbout]) => {
    return $allAbout.find(about => about.meta.path.includes(`-${$locale}.md`));
})

export const allServices = writable([] as StaticDocument[]);
export const services = derived([locale, allServices], ([$locale, $allServices]) => {
    return $allServices.find(service => service.meta.path.includes(`-${$locale}.md`));
})

export const allSupports = writable([] as StaticDocument[]);
export const support = derived([locale, allSupports], ([$locale, $allSupports]) => {
    return $allSupports.find(support => support.meta.path.includes(`-${$locale}.md`));
})

export const allPresentations = writable([] as StaticDocument[]);
export const presentation = derived([locale, allPresentations], ([$locale, $allPresentations]) => {
    return $allPresentations.find(presentation => presentation.meta.path.includes(`-${$locale}.md`));
})

// -- Search related stores

export const enSearchIndex = writable(null as FlexSearch.Document | null);
export const frSearchIndex = writable(null as FlexSearch.Document | null);
// export const searchIndex = derived([enSearchIndex, frSearchIndex, locale], ([$enSearchIndex, $frSearchIndex, $locale]) => {
//     return $locale === 'en' ? $enSearchIndex : $frSearchIndex;
// })
export const searchIndex = writable(null as Document | null);
export const searchModalOpen = writable(false);