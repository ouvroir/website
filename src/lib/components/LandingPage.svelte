<script lang="ts">
	import { fade } from 'svelte/transition';
	import CiecoWhite from './logos/CiecoWhite.svelte';
	import OuvroirPres from './logos/OuvroirPres.svelte';
	import Udem from './logos/Udem.svelte';
	import CrihnLogo from './logos/CrihnLogo.svelte';
	import { presentation } from '$lib/stores';

	let presentationElt: HTMLElement;
	if (!$presentation) throw new Error('No presentation data found');
</script>

<section class="presentation-wrapper fill-vh" id="presentation">
	<OuvroirPres />
	<div class="presentation-container">
		<div class="title-container">
			<div class="logo-ouvroir"></div>
			<div>
				<h1>Laboratoire <span class="ovr">Ouvroir</span></h1>
				<h2 class="subtitle">d’histoire de l’art et de muséologie numériques</h2>
			</div>
		</div>
		<article bind:this={presentationElt} class="presentation" out:fade={{ duration: 500 }}>
			{@html $presentation.html}

			<!-- {#if $screenType === 'desktop'}
			<div class="cieco">
				<CiecoWhite />
			</div>
		{:else} -->

			<!-- {/if} -->
		</article>
		<div class="logos">
			<div class="cieco">
				<CiecoWhite />
			</div>
			<div class="crihn">
				<CrihnLogo color="white" />
			</div>
			<Udem width="17rem" fontColor="white" />
		</div>
	</div>
</section>

<style>
	.logos {
		grid-column: 4/-1;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 3rem;
		/* max-width: 5rem; */
		padding-top: 3rem;
	}

	.cieco {
		position: static;
		width: 8rem;
		top: 35%;
		right: 14%;
		fill: white !important;
	}
	.crihn {
		position: static;
		width: 12rem;
		top: 35%;
		right: 14%;
		fill: white !important;
	}

	.title-container {
		grid-column: 2/5;
		/* display: flex; */
		/* flex-direction: row; */
	}
	.logo-ouvroir {
		all: unset;
		display: block;
		position: relative;
		/* left: 2rem; */
		top: 1rem;
		width: 8rem;
	}

	/** Presentation */

	.fill-vh {
		height: 90vh;
	}

	.presentation-wrapper {
		/* grid-column: 2 / -2; */
		overflow: hidden;
		background-color: var(--bg-clr-presentation);
		color: white;
		overflow-y: scroll;
	}

	.presentation {
		padding-top: 5.5rem;
		/* padding-left: 8%; */
		grid-column: 5/-2;
		grid-row: 1;
		font-size: 1.5rem;
		font-weight: 400;
		line-height: 2.5rem;
		transition: color 1s ease-in;
		background-color: none;
		/* text-align: center; */
		/* display: grid; */
		/* grid-template-columns: repeat(12, 1fr);
		padding: 2rem 4%; */
	}

	.title-container h1 {
		font-size: 3rem;
		font-weight: 600;
		margin-bottom: 1rem;
		padding-top: 5rem;
	}

	.ovr {
		font-family: var(--ff-logo) !important;
		color: var(--clr-accent);
	}

	.subtitle {
		font-size: 1.3rem;
		font-weight: 300;
		margin-bottom: 3rem;
	}

	@media screen and (max-width: 1100px) {
		h1 {
			line-height: 3rem;
			grid-column: 2/-1;
		}
		.subtitle {
			line-height: 2rem;
			margin-bottom: 0;
		}

		.cieco {
			position: static;
			float: left;
			margin-top: 2rem;
			margin-right: 2rem;
			width: 10rem;
		}
		.title-container {
			margin-bottom: 3rem;
			grid-column: 2/8;
		}

		.presentation {
			grid-column: 2/8;
			grid-row: 2;
			padding-top: 0;
		}

		.logos {
			grid-column: 2/8;
		}
	}

	@media screen and (max-width: 480px) {
		.title-container {
			flex-direction: column;
		}
		.subtitle {
			line-height: 2rem;
			margin-bottom: 0;
		}

		.logo-ouvroir {
			/* position: relative; */
			left: 25%;
			top: 2rem;
		}
	}
</style>
