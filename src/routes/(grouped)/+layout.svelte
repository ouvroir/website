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
		margin: var(--content-top-padding) 0;
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

	.about-tree-container {
		position: sticky;
		grid-column: feature-start / content-start;
		grid-row: 2;
		top: 4rem;
		height: fit-content;
	}
</style>
