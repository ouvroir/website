<script lang="ts">
	import { page } from '$app/stores';
	import { screenType, aboutPageTitle } from '$lib/stores.js';
	import { Tree } from '$lib/components';

	$: smallScreen = $screenType === 'mobile' || $screenType === 'tablet-vertical';
	// $: section = $page.route.id?.match(/\/\[(\w+)=\1\]/)?.[1];
</script>

<section class="info-page">
	<header>
		<h1>{$aboutPageTitle}</h1>
	</header>

	{#if !smallScreen}
		<div class="about-tree-container">
			<Tree />
		</div>
	{/if}

	<div id="article-container" class="article-content">
		<slot />
	</div>
</section>

<div class="grid-empty-row" />

<style>
	.info-page {
		grid-column: full;
		display: grid;
		grid-template-columns: subgrid;
		margin-top: 3rem;
	}

	header {
		grid-column: content-start / popout-end;
	}

	.article-content {
		grid-column: content-start / popout-end;
		font-size: 1.1rem;
	}

	h1 {
		font-size: var(--fs-700);
		padding-bottom: var(--padding-title);
		color: var(--clr-b);
		font-weight: 700;
	}

	.bigger {
		grid-column: 3/-2;
	}
	.dropdown-nav {
		grid-column: 1/-1;
		height: 2rem;
		margin-bottom: 2rem;
	}

	.about-tree-container {
		position: sticky;
		grid-column: 1/3;
		grid-row: 2;
	}

	/** Small screens */
	@media screen and (max-width: 820px) {
		.info-page-header {
			grid-column: 1/-1 !important;
		}
		.info-page-header > h1 {
			padding-bottom: 2rem;
		}
		.article-content {
			grid-column: 1/-1;
			grid-row: 3;
		}
	}
	@media screen and (min-width: 481px) and (max-width: 820px) {
		.dropdown-nav {
			width: 40%;
		}
	}
</style>
