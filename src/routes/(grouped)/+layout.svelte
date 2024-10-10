<script lang="ts">
	import { page } from '$app/stores';
	import { screenType, aboutPageTitle } from '$lib/stores.js';
	import { Tree, Support } from '$lib/components';

	$: smallScreen = $screenType === 'mobile' || $screenType === 'tablet-vertical';
	$: section = $page.route.id?.match(/\/\[(\w+)=\1\]/)?.[1];
</script>

<section class="info-page">
	<header class="header-content">
		<div class="title-container">
			<h1>{$aboutPageTitle}</h1>
		</div>
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

{#if section === 'about'}
	<Support />
{/if}

<style>
	aside {
		container: aside / inline-size;
	}
	.info-page {
		grid-column: full;
		display: grid;
		grid-template-columns: subgrid;
		margin-bottom: var(--content-bottom-padding);
	}

	header {
		grid-column: full;
	}

	.article-content {
		grid-column: content-start / popout-end;
		font-size: 1.1rem;
	}

	.about-tree-container {
		position: sticky;
		grid-column: feature-start / content-start;
		grid-row: 2;
		top: 4rem;
		height: fit-content;
	}

	@container aside (min-width: 10rem) {
		* {
			color: blue;
		}
	}
</style>
