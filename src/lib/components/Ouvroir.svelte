<script lang="ts">
	import { t } from '$lib/i18n/i18n';
	import { base } from '$app/paths';
	import { fly } from 'svelte/transition';
	import { showPresentation } from '$lib/stores';

	let visible = false;
	$: $showPresentation
		? null
		: setTimeout(() => {
				visible = true;
		  }, 500);
</script>

<a href={`${$t('route.home')}`} class={`logo ${$showPresentation ? 'hidden' : ''}`}>
	{#if visible}
		<img
			class="logo-img"
			src={`${base}/ouvroir-logo.svg`}
			alt="ll"
			transition:fly={{ x: 60, duration: 1000 }}
		/>
	{:else}
		<img class="logo-img invisible" src={`${base}/ouvroir-logo.svg`} alt="ll" />
	{/if}

	<div class="logo-text">
		<h1>Ouvroir</h1>
		<p>d'histoire de l'art et de muséologie numériques</p>
	</div>
</a>

<style>
	.logo {
		display: flex;
		gap: 1rem;
		grid-column: span 2;
		cursor: pointer;
	}

	.logo-text {
		/* border-left: solid 0.5px var(--clr-magenta); */
		padding-right: 1rem;
		background-color: var(--clr-bg);
		z-index: 1;
		transition: all 0.5s ease-in-out;
	}
	.logo-text > h1 {
		font-family: var(--ff-logo) !important;
		font-weight: 700;
		font-size: 1.6rem;
		margin-bottom: 0.2rem;
		color: var(--clr-magenta);
	}

	.logo-text > p {
		font-size: 0.85rem;
		font-family: var(--ff-logo) !important;
		line-height: 1rem;
		font-weight: 300;
		width: 10rem;
	}
	.logo-img {
		/* z-index: -1; */
		max-width: 3.7rem;
		fill: var(--clr-magenta);
		color: var(--clr-magenta);
	}

	.hidden {
		visibility: hidden;
	}
</style>
