<script lang="ts">
	import { fade } from 'svelte/transition';
	import CiecoWhite from './logos/CiecoWhite.svelte';
	import OuvroirPres from './logos/OuvroirPres.svelte';
	import Udem from './logos/Udem.svelte';
	import CrihnLogo from './logos/CrihnLogo.svelte';
	import { screenType } from '$lib/stores';

	let presentationElt: HTMLElement;
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
			<p>
				L’Ouvroir d’histoire de l’art et de muséologie numérique de l’Université de Montréal est un
				laboratoire de recherche destiné à soutenir le travail conduit dans le cadre du Partenariat
				«&nbsp<em class="s-1erdp_PvG-Jl"
					>Des nouveaux usages des collections dans les musées d’art</em
				>&nbsp»
				<a href="https://cieco.umontreal.ca/" class="s-1erdp_PvG-Jl">CIÉCO</a> dirigé par Johanne Lamoureux.
			</p>

			<p>
				Sa création permet de doter le Canada d’un équipement de recherche dédié à l’expérimentation
				et le développement d’innovations dans les domaines de l’histoire de l’art et de la
				muséologie numériques.
			</p>

			<p>
				L’Ouvroir est membre du <em
					>Centre de recherche interuniversitaire sur les humanités numériques</em
				>, <a href="https://www.crihn.org/" class="s-1erdp_PvG-Jl">CRIHN</a>.
			</p>
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
		grid-column: 1/5;
		display: flex;
		flex-direction: row;
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

	.presentation a {
		color: var(--clr-accent);
	}

	.presentation p {
		font-size: 1.15rem;
		line-height: 1.7rem;
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

	.presentation > p + p {
		margin-top: 2rem;
	}

	@media screen and (max-width: 1100px) {
		h1 {
			line-height: 3rem;
		}
		.subtitle {
			line-height: 2rem;
			margin-bottom: 0;
		}
		.presentation p {
			width: 80%;
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

		.presentation p {
			width: 90%;
		}
	}
</style>
