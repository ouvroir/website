import { writable } from "svelte/store";

export const showPresentation = writable(true);

export const stickyActivated = writable(false);

export const memberExpaned = writable('');