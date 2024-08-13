<script lang="ts">
	import { page } from '$app/stores';
	import { screenType, aboutPageTitle } from '$lib/stores.js';
	import Tree from '$lib/components/Tree.svelte';

	$: smallScreen = $screenType === 'mobile' || $screenType === 'tablet-vertical';
	// $: section = $page.route.id?.match(/\/\[(\w+)=\1\]/)?.[1];
</script>

{#if !smallScreen}
	<div class="about-tree-container">
		<Tree />
	</div>
{/if}

<section class="info-page">
	<header class="info-page-header">
		<h1>{$aboutPageTitle}</h1>
	</header>
	<!-- {#if smallScreen}
		<select class="dropdown-nav" aria-label="secondary-nav" id="">
			{#each navLinks as l}
				<option on:click={() => goto($t(`route.${section}.${l}`))}>
					{#if l !== 'support'}
						<a
							href={$t(`route.${section}.${l}`)}
							class={`${$page.url.pathname === $t(`route.${section}.${l}`) ? 'active' : ''}`}
						>
							{$t(`${section}.${l}`)}
						</a>
					{/if}
				</option>
			{/each}
		</select>
	{/if} -->

	<div id="article-container" class="article-content">
		<slot />
	</div>
</section>

<div class="grid-empty-row" />

<style>
	.info-page {
		display: contents;
	}

	.info-page-header {
		grid-column: 3/7;
		grid-row: 1;
	}

	.article-content {
		grid-column: 3/7;
		grid-row: 2;
		font-size: 1.1rem;
	}

	.info-page-header > h1 {
		font-size: 2.5rem;
		padding-bottom: var(--padding-title);
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
