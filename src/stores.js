import { writable, derived } from 'svelte/store';

// Based on https://svelte.dev/repl/4c0e43f14ddb4232addc784d35e03baf?version=3.22.2
export const windowHeight = writable(0);

export const derivedWindowHeight = derived(windowHeight, ($windowHeight) => $windowHeight);

export const markersData = writable([]);