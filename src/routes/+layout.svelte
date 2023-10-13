<script lang="ts">
	import Nav from '$components/Nav.svelte';
	import Support from '$components/Support.svelte';
	import Footer from '$components/Footer.svelte';
	import LandingPage from '$lib/components/LandingPage.svelte';
	import { page } from '$app/stores';
	import { t } from '$lib/i18n/i18n';
	import { showPresentation, screenType, screenWidth } from '$lib/stores.js';
	import '$lib/styles/reset.css';
	import '$lib/styles/style.css';

	export let data;

	let offsetHeight: number;

	if ($page.route.id && !$page.route.id.includes('home')) {
		showPresentation.set(false);
	}

	$: addGap = $page && $page.route.id === '/[news=news]';

	// $: console.log($screenType, $screenWidth);
</script>

{#if $showPresentation}
	<LandingPage />
{/if}

<Nav />

<main class={`${addGap ? 'addGap' : ''}`} bind:offsetHeight bind:clientWidth={$screenWidth}>
	<slot />
</main>

{#if offsetHeight > 800}
	<div class="btt-container">
		<a class="btt-btn" href={$page.url.pathname}>{$t('ui.btt')}</a>
	</div>
{/if}

<Support content={data.support} />

{#if $screenType === 'desktop' || $screenType === 'tablet-horizontal'}
	<Footer />
{/if}

<style>
	.btt-container {
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	.btt-btn {
		color: var(--clr-accent);
		font-family: var(--ff-sans);
		font-weight: 300;
		margin: 0rem 4% 4rem auto;
	}

	@media screen and (min-width: 821px) and (max-width: 1024px) {
		.btt-btn {
			margin: 0rem auto 4rem 4%;
		}
	}
</style>
