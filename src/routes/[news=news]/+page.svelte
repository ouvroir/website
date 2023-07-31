<script lang="ts">
	export let data;
	import PostCard from '$lib/components/PostCard.svelte';
	import FilterPanel from '$lib/components/FilterPanel.svelte';

	const posts = [...data.posts, ...data.posts];
	const tags = posts.reduce((acc, p) => {
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

<FilterPanel {tags} {selectedDocuments} {selectedTags} />

<div class="tags-container">
	<ul />
</div>
<div class="container">
	{#each posts as post}
		<PostCard {post} />
	{/each}
</div>

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
