<script lang="ts">
	import { t, dateToLocalizedString } from '$i18n/i18n';
	import { events, blogs, projects, resources } from '$lib/stores';
	import type { Blog, Event, Resource } from '$lib/types';
	import { getDateFromContent } from '$lib/utils/helpers';
	import { NewsCard } from '$lib/components';
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
	<ul class="section-content">
		<div class="section-title">
			<h1>{$t('home.news.latest')}</h1>
			<PatternGutters contrast={true} />
		</div>

		{#each news as content}
			<NewsCard {content} />
		{/each}
	</ul>
</section>

<style>
	section {
		grid-column: full;
		padding-top: 5rem;
		display: grid;
		grid-template-columns: subgrid;
	}

	ul {
		grid-column: feature;
		columns: 2 25rem;
		column-gap: 3rem;
		column-fill: balance;

		& li {
			min-width: 25rem;
			margin-bottom: 2rem;
			break-inside: avoid;
		}
	}
	h1 {
		top: 3rem;
		left: 2rem;
		width: fit-content;
		height: max-content;
		position: relative;
		padding: 1rem 1.2rem;
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 5rem;
		z-index: 2;
		background-color: var(--clr-a);
		color: var(--clr-b);
		/* border-radius: var(--border-radius); */
	}

	.section-title {
		/* display: block; */
		position: sticky;

		/* right: 8rem; */
		/* grid-column: content-end / full-end; */
		display: flex;
		max-height: max-content;
		/* gap: 1rem; */
		border-radius: var(--border-radius);
		margin-bottom: 3rem;
		max-width: 100%;
	}
</style>
