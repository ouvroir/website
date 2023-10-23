<script lang="ts">
	import { t } from '$lib/i18n/i18n.js';
	import FilterPanel from '$lib/components/FilterPanel.svelte';
	import NewsCard from '$lib/components/NewsCard.svelte';
	import { showPresentation, selectedNewsTypes, disabledNewsTypes } from '$lib/stores.js';
	import { onMount } from 'svelte';
	import { localize } from '$i18n/i18n';

	export let data;
	showPresentation.set(false);

	const filterTags = (d, selectedTags: string[]) => {
		if (selectedTags.length === 0 || !d.meta.tags) return true;
		let contains = false;
		d.meta.tags.forEach((t) => {
			if (selectedTags.includes(t)) contains = true;
		});
		return contains;
	};

	function sortByDate(a, b) {
		let aDate = a.meta.type === 'event' ? a.meta.dateStart : a.meta.date;
		let bDate = b.meta.type === 'event' ? b.meta.dateStart : b.meta.date;

		aDate = aDate.split('T')[0];
		bDate = bDate.split('T')[0];
		return bDate.localeCompare(aDate);
	}

	$: selectedTags = [] as string[];

	$: meetings = $selectedNewsTypes.includes('meeting')
		? data.meetings.sort((a, b) => sortByDate(a, b))
		: [];

	$: console.log(meetings);

	$: posts = $localize(data.news)
		.filter((d) => $selectedNewsTypes.includes(d.meta.type) && filterTags(d, selectedTags))
		.sort((a, b) => sortByDate(a, b));

	$: $disabledNewsTypes = ['event', 'blog', 'meeting'].filter(
		(t) => posts && posts.filter((p) => p.meta.type === t).length === 0
	);

	$selectedNewsTypes = $selectedNewsTypes.filter((t) => !$disabledNewsTypes.includes(t));

	$: tags =
		posts.reduce((acc, p) => {
			if (!p.meta.tags) return acc;
			p.meta.tags.forEach((t) => {
				if (!acc.includes(t)) acc.push(t);
			});
			return acc;
		}, []) ?? null;

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

<FilterPanel {tags} bind:selectedTags />

<div class="tags-container">
	<ul />
</div>
{#if posts}
	<ul class="container">
		{#each posts as post}
			<NewsCard {post} />
		{/each}
		{#if meetings}
			{#each meetings as m}
				<NewsCard post={m} />
			{/each}
		{/if}
	</ul>
{/if}

<style>
	.tags-container {
		grid-column: span 2;
	}

	.container {
		/* margin-top: 1rem; */
		grid-column: 2/-2;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(15rem, 18rem));
		grid-auto-flow: dense;
		gap: 3rem;
		flex-wrap: wrap;
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
			grid-column: 1/-1;
			grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));

			/* column-gap: 0; */
		}
	}

	/** Mobile and Tablet vertical */
	@media screen and (max-width: 820px) {
		.container {
			grid-column: 1/-1;
			grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
		}
	}
</style>
