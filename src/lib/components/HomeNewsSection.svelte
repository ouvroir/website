<script lang="ts">
	import { t, dateToLocalizedString } from '$i18n/i18n';
	import { events, blogs, projects, resources } from '$lib/stores';
	import type { Blog, Event, Resource } from '$lib/types';
	import { getDateFromContent } from '$lib/utils/helpers';
	import HomeNewsItem from '$lib/components/HomeNewsItem.svelte';
	import Pattern from './Patterns.svelte';
	import PatternGutters from './PatternGutters.svelte';

	if (!events || !blogs || !projects) throw new Error('No data found');

	$: news = [...$events, ...$blogs, ...$resources]
		.sort((a, b) => {
			const aDate = getDateFromContent(a),
				bDate = getDateFromContent(b);
			return bDate.getTime() - aDate.getTime();
		})
		.slice(0, 6);
</script>

<section class="news-section-wrapper">
	<ul class="news-container">
		{#each news as content}
			<HomeNewsItem {content} />
		{/each}
	</ul>
	<div class="section-title">
		<h1>{$t('home.news.latest')}</h1>
		<PatternGutters contrast={true} />
	</div>
</section>

<style>
	section {
		grid-column: full;
		padding-top: 5rem;
		display: grid;
		grid-template-columns: subgrid;
	}
	ul {
		max-width: 70%;
		grid-column: feature-start / content-end;
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}
	h1 {
		top: 4rem;
		left: -6rem;
		width: fit-content;
		height: fit-content;
		position: relative;
		padding: 1rem 1.2rem;
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 2rem;
		z-index: 2;
		background-color: var(--clr-a);
		color: var(--clr-b);
		border-radius: var(--border-radius);
	}

	.section-title {
		position: sticky;
		top: 8rem;
		left: 0;
		/* right: 8rem; */
		grid-column: content-end / full-end;
		display: flex;
		max-height: 70vh;
		gap: 1rem;
		/* overflow: hidden; */
		border-radius: var(--border-radius);
	}
</style>
