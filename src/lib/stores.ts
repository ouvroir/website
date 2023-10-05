import { writable, derived } from "svelte/store";
import { building } from '$app/environment';


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
export const selectedNewsTypes = writable(building ? ['event', 'blog', 'meeting'] : ['event', 'blog'])
export const disabledNewsTypes = writable([] as string[])

export const aboutPageTitle = writable('');

