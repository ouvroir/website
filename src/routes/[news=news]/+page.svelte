<script lang="ts">
	import { t } from '$lib/i18n/i18n';
	import { FilterPanel, NewsCard, GenericCard } from '$lib/components';
	import { onMount, setContext } from 'svelte';
	import { derived, writable } from 'svelte/store';
	import { building } from '$app/environment';
	import { meetings, events, blogs } from '$lib/stores';
	import { sortContentByDate, getTagsfromContent, contentHasTags } from '$lib/utils/helpers';

	if (!events || !blogs || !meetings) throw new Error('No data found');

	const selectedTags = writable([] as string[]);
	const selectedDocTypes = writable(building ? ['event', 'blog', 'meeting'] : ['event', 'blog']);
	const disabledNewsTypes = writable([] as string[]);
	const tags = derived([blogs, events, meetings], ([$blogs, $events, $meetings]) =>
		getTagsfromContent([...$events, ...$blogs, ...$meetings])
	);

	$: posts = [...$events, ...$blogs, ...$meetings]
		.filter((d) => $selectedDocTypes.includes(d.meta.kind) && contentHasTags(d, $selectedTags))
		.sort((a, b) => sortContentByDate(a, b));

	const selectableTags = derived(
		[events, blogs, meetings, selectedDocTypes],
		([$events, $blogs, $meetings, $selectedDocTypes]) =>
			getTagsfromContent(
				[...$events, ...$blogs, ...$meetings].filter((d) => $selectedDocTypes.includes(d.meta.kind))
			)
	);

	setContext('types', {
		selectedDocTypes,
		disabledNewsTypes,
		selectedTags,
		tags,
		selectableTags
	});

	// If there are no posts of a certain type, disable it
	$: $disabledNewsTypes = ['event', 'blog', 'meeting'].filter(
		(t) => posts && posts.filter((p) => p.meta.kind === t).length === 0
	);

	$selectedDocTypes = $selectedDocTypes.filter((t) => !$disabledNewsTypes.includes(t));

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

<FilterPanel />

<div class="tags-container">
	<ul />
</div>
{#if posts}
	<ul class="column-layout">
		{#each posts as content, i}
			<GenericCard {content} />
			<!-- {#if i !== posts.length - 1}
				<hr />
			{/if} -->
		{/each}
		<!-- {#if $selectedDocTypes.includes('meeting')}
			{#each $meetings as m}
				<NewsCard post={m} />
			{/each}
		{/if} -->
	</ul>
{/if}

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
