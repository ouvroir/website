<script lang="ts">
	import { fade } from 'svelte/transition';
	import CiecoWhite from './logos/CiecoWhite.svelte';
	import OuvroirPres from './logos/OuvroirPres.svelte';
	import Patterns from './Patterns.svelte';
	import Udem from './logos/Udem.svelte';
	import CrihnLogo from './logos/CrihnLogo.svelte';
	import { presentation } from '$lib/stores';

	let presentationElt: HTMLElement;
	if (!$presentation) throw new Error('No presentation data found');
</script>

<section class="presentation-wrapper fill-vh" id="presentation">
	<Patterns className="left-feature" />
	<div class="presentation">
		<div class="title-container">
			<div class="logo-ouvroir"></div>
			<div>
				<h1>Laboratoire Ouvroir</h1>
				<h2 class="subtitle">d’histoire de l’art et de muséologie numériques</h2>
			</div>
		</div>
		<article bind:this={presentationElt} class="presentation" out:fade={{ duration: 500 }}>
			{@html $presentation.html}
		</article>
		<!-- <div class="logos">
			<div class="cieco">
				<CiecoWhite />
			</div>
			<div class="crihn">
				<CrihnLogo color="white" />
			</div>
			<Udem width="17rem" fontColor="white" />
		</div> -->
	</div>
</section>

<style>
	.logo-ouvroir {
		all: unset;
		display: block;
		position: relative;
		/* left: 2rem; */
		top: 1rem;
		width: 8rem;
	}

	/** Presentation */

	.presentation-wrapper {
		--radius: 40px;
		position: relative;
		grid-column: full;
		display: grid;
		align-items: center;
		grid-template-columns: subgrid;
		background-color: var(--clr-b);
		color: var(--clr-a);
		/* border-radius: 30px; */
		border-bottom-left-radius: var(--radius);
		border-top-right-radius: var(--radius);
		min-height: 100vh;

		box-shadow: 20px 10px 1rem rgba(0, 0, 0, 0.2);
	}

	.presentation {
		grid-column: content;
		width: 70ch;
		& > p {
			font-size: 1.2rem;
			font-weight: 400;
			line-height: 1.8rem;
		}

		& a {
			color: var(--clr-a);
			text-decoration: underline 0.15rem var(--clr-a);
		}
	}

	article {
		width: 140ch;
	}

	.title-container h1 {
		font-size: 4rem;
		font-weight: 800;
		margin-bottom: 1rem;
	}

	.subtitle {
		font-size: 2rem;
		font-weight: 300;
		font-weight: 200;
		margin-bottom: 3rem;
	}

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
