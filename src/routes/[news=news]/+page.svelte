<script lang="ts">
	import { t } from '$lib/i18n/i18n.js';
	import FilterPanel from '$lib/components/FilterPanel.svelte';
	import NewsCard from '$lib/components/NewsCard.svelte';
	import { showPresentation } from '$lib/stores.js';

	export let data;
	showPresentation.set(false);

	const posts = data.news;
	const tags = posts.reduce((acc, p) => {
		if (!p.meta.tags) return acc;
		p.meta.tags.forEach((t) => {
			if (!acc.includes(t)) acc.push(t);
		});
		return acc;
	}, []);

	const filterTags = (d, selectedTags: string[]) => {
		if (selectedTags.length === 0) return true;
		let contains = false;
		d.meta.tags.forEach((t) => {
			if (selectedTags.includes(t)) contains = true;
		});
		return contains;
	};

	const selectedDocuments: string[] = ['Events', 'Articles'];
	const selectedTags: string[] = [];
</script>

<svelte:head>
	<title>{$t('head.news')}</title>
</svelte:head>

<FilterPanel {tags} {selectedDocuments} {selectedTags} />

<div class="tags-container">
	<ul />
</div>
<ul class="container">
	{#each posts as post}
		<NewsCard {post} />
	{/each}
</ul>

<style>
	.tags-container {
		grid-column: span 2;
	}

	.container {
		/* margin-top: 1rem; */
		grid-column: 2/-2;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		column-gap: 3rem;
		row-gap: 4rem;
		flex-wrap: wrap;
	}
</style>
