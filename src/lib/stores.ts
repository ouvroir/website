import { writable, derived, get } from "svelte/store";
import type { Writable, Readable } from "svelte/store";
import type { Blog, Event, Meeting, Member, Project, Resource, StaticDocument } from "./types";
import { locale } from '$i18n/i18n'
import FlexSearch from "flexsearch";
import { page } from "$app/stores";
import { SearchIndex } from "./utils/search";

export const showHero = derived(page, ($page) => $page.route.id?.includes('home'))
export const showNavLogo = writable(true);

export const stickyActivated = writable(true);

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

// So here derived is improved in the sense that by default
// it returns localized content (its original behavior) but one can
// explicitly ask for the content in a specific locale.
function createDerivedContentStrore<T>(contentStore: Writable<T[]>) {
    const { subscribe } = derived([locale, contentStore], ([$locale, $contentStore]) =>
        $contentStore.filter(d => d.meta.path.includes(`-${$locale}.md`))
    );
    return {
        subscribe,
        localize: (locale: string) => get(contentStore).filter(c => c.meta.path.includes(`-${locale}.md`)) as T[],
        getCurrentLocale: () => get(locale)

    }
}

// Only for static content. Seems like a duplicate from function 
// but couldnt find a way to make it generic...
function createDerivedStaticContentStrore<T>(contentStore: Writable<T[]>) {
    const { subscribe } = derived([locale, contentStore], ([$locale, $contentStore]) =>
        $contentStore.find(d => d.meta.path.includes(`-${$locale}.md`))
    );
    return {
        subscribe,
        localize: (locale: string) => get(contentStore).find(c => c.meta.path.includes(`-${locale}.md`)) as T,
        getCurrentLocale: () => get(locale)
    }
}

export const allProjects = writable([] as Project[]);
export const projects = createDerivedContentStrore(allProjects);

export const allResources = writable([] as Resource[]);
export const resources = createDerivedContentStrore(allResources);

export const allBlogs = writable([] as Blog[]);
export const blogs = createDerivedContentStrore(allBlogs);

export const allEvents = writable([] as Event[]);
export const events = createDerivedContentStrore(allEvents);

export const allMembers = writable([] as Member[]);
export const members = createDerivedContentStrore(allMembers);

export const allAbout = writable([] as StaticDocument[]);
export const about = createDerivedStaticContentStrore(allAbout);

export const allServices = writable([] as StaticDocument[]);
export const services = createDerivedStaticContentStrore(allServices);

export const allSupports = writable([] as StaticDocument[]);
export const support = createDerivedStaticContentStrore(allSupports);

export const allPresentations = writable([] as StaticDocument[]);
export const presentation = createDerivedStaticContentStrore(allPresentations);

// -- Search related stores

export const enSearchIndex = writable(new SearchIndex());
export const frSearchIndex = writable(new SearchIndex());
export const searchIndex = derived(locale, ($locale) => {
    return $locale === 'en' ? get(enSearchIndex) : get(frSearchIndex);
})
export const searchModalOpen = writable(false);

export const membersHash = writable([]) as Writable<{ username: string, name: string }[]>