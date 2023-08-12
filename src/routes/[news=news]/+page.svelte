<script lang="ts">
	import { t } from '$lib/i18n/i18n.js';
	import FilterPanel from '$lib/components/FilterPanel.svelte';
	import NewsCard from '$lib/components/NewsCard.svelte';
	import { showPresentation } from '$lib/stores.js';

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

	let selectedDocuments: string[] = ['event', 'blog'];
	let selectedTags: string[] = [];

	$: posts = data.news
		.filter((d) => selectedDocuments.includes(d.meta.type) && filterTags(d, selectedTags))
		.sort((a, b) => {
			const aDate = a.meta.type === 'event' ? a.meta.dateStart : a.meta.date;
			const bDate = b.meta.type === 'event' ? b.meta.dateStart : b.meta.date;
			return aDate - bDate;
		});

	$: tags =
		data.news.reduce((acc, p) => {
			if (!p.meta.tags) return acc;
			p.meta.tags.forEach((t) => {
				if (!acc.includes(t)) acc.push(t);
			});
			return acc;
		}, []) ?? null;
</script>

<svelte:head>
	<title>{$t('head.news')}</title>
</svelte:head>

<FilterPanel {tags} bind:selectedDocuments bind:selectedTags />

<div class="tags-container">
	<ul />
</div>
{#if posts}
	<ul class="container">
		{#each posts as post}
			<NewsCard {post} />
		{/each}
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
