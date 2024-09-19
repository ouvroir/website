<script lang="ts">
	import { t } from '$lib/i18n/i18n';
	import { FilterPanel, NewsCard, GenericCard } from '$lib/components';
	import { onMount, setContext } from 'svelte';
	import { derived, writable } from 'svelte/store';
	import { building } from '$app/environment';
	import { meetings, events, blogs } from '$lib/stores';
	import { sortContentByDate, getTagsfromContent, contentHasTags } from '$lib/utils/helpers';
	import ContentList from '$lib/components/ContentList.svelte';

	onMount(() => {
		if (window.location.hash) {
			const el = document.getElementById(window.location.hash.slice(1));
			if (el) {
				el.scrollIntoView();
			}
		}
	});
</script>

<svelte:head>
	<title>{$t('head.news')}</title>
</svelte:head>

<ContentList />

<style>
	hr {
		border: none; /* Remove default border */
		border-top: 0.5rem solid var(--cb);
		margin: 2rem 0;
	}
	.tags-container {
		grid-column: span 2;
	}

	/** All touch screens */
	@media screen and (max-width: 1024px) {
		.container {
			grid-column: 1/-1;
		}
	}

	/** Tablet horizontal */
	@media screen and (min-width: 821px) and (max-width: 1024px) {
		.container {
			grid-column: full;
		}
	}

	/** Mobile and Tablet vertical */
	@media screen and (max-width: 820px) {
		.container {
			grid-column: full;
		}
	}
</style>
