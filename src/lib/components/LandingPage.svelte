<script lang="ts">
	import { slide, fade } from 'svelte/transition';
	import CiecoWhite from './logos/CiecoWhite.svelte';
	import { base } from '$app/paths';
	import OuvroirPres from './logos/OuvroirPres.svelte';
	import Ouvroir from './Ouvroir.svelte';

	let presentationElt: HTMLElement;
</script>

<section
	class="presentation-wrapper fill-vh"
	id="presentation"
	transition:slide={{ axis: 'y', delay: 0, duration: 1000 }}
>
	<article bind:this={presentationElt} class="presentation" out:fade={{ duration: 500 }}>
		<div class="stroke-2"></div>
		<div class="stroke-3"></div>
		<div class="logo-ouvroir">
			<OuvroirPres />
		</div>
		<h1>Laboratoire <span class="ovr">Ouvroir</span></h1>
		<h2 class="subtitle">d’histoire de l’art et de muséologie numériques</h2>
		<div class="stroke-1"></div>
		<p class="description">
			L’Ouvroir d’histoire de l’art et de muséologie numérique de l’Université de Montréal, est un
			laboratoire de recherche destiné à soutenir le travail conduit dans le cadre du Partenariat « <em
				class="s-1erdp_PvG-Jl">Des nouveaux usages des collections dans les musées d’art</em
			>
			»
			<a href="https://cieco.umontreal.ca/" class="s-1erdp_PvG-Jl">CIÉCO</a> dirigé par Johanne Lamoureux.
		</p>

		<p>
			Sa création permet de doter le Canada d’un équipement de recherche dédié à l’expérimentation
			et le développement d’innovations dans le domaine de l’histoire de l’art et de la muséologie
			numérique.
		</p>

		<p class="description-crihn">
			L’Ouvroir est membre du <em
				>Centre de recherche interuniversitaire sur les humanités numériques</em
			>, CRIHN.
		</p>

		<div class="cieco">
			<CiecoWhite />
		</div>

		<!-- <ul class="presentation-logos">
			<li class="logo-cieco">
				<Cieco />
			</li>
			<li class="logo-crihn">
				<img src={`${base}/logos/support/crihn.png`} alt="" />
			</li>
		</ul> -->
	</article>
</section>

<style>
	.cieco {
		position: absolute;
		width: 15rem;
		top: 35%;
		right: 14%;
	}
	.logo-ouvroir {
		all: unset;
		display: block;
		position: absolute;
		left: 47%;
		top: 7%;
		width: 8rem;
	}
	.stroke-1,
	.stroke-2,
	.stroke-3 {
		position: absolute;
		z-index: 0;
	}

	.stroke-1 {
		left: 3%;
		top: 25%;
		width: 80%;
		height: 0;
		border-top: var(--presentation-stroke);
		background-color: var(--bg-clr-presentation);
	}

	.stroke-2 {
		right: 30%;
		right: 35%;
		top: 10%;
		height: 20rem;
		border-left: var(--presentation-stroke);
		transform: rotate(10deg);
	}
	/* .stroke-3 {
		left: 10%;
		bottom: 15%;
		height: 15rem;
		border-left: var(--presentation-stroke);
		transform: rotate(10deg);
	} */

	/** Presentation */

	.fill-vh {
		height: 85vh;
	}

	.presentation-wrapper {
		/* grid-column: 2 / -2; */
		overflow: hidden;
		background-color: var(--bg-clr-presentation);
		color: white;
	}

	.presentation {
		padding-top: 5rem;
		padding-left: 8%;
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
		color: orangered;
	}

	.presentation p {
		width: 50%;
		font-size: 1.2rem;
		margin-bottom: 3rem;
		line-height: 2rem;
	}

	.description {
		margin-bottom: 0rem !important;
	}

	.presentation h1 {
		/* font-family: var(--ff-logo) !important; */
		font-size: 3rem;
		font-weight: 600;
		margin-bottom: 1rem;
	}

	.ovr {
		font-family: var(--ff-logo) !important;
		color: orangered;
	}

	.subtitle {
		font-size: 1.3rem;
		font-weight: 300;
		/* color: orangered; */
		margin-bottom: 3rem;
	}

	.presentation > p + p {
		margin-top: 2rem;
	}

	.presentation-footer {
		display: block;
		height: fit-content;
		padding: 0;
		margin-top: 4rem;
	}

	.presentation-logos {
		display: flex;
		width: 100%;
		flex-direction: row;
		align-items: center;
		gap: 10rem;
		position: relative;
		margin: 6rem 0;
	}

	.presentation-logos::after {
		content: '';
		position: absolute;
		top: -25%;
		left: -25%;
		width: 150%;
		height: 150%;
		/* background-color: rgba(0, 0, 0, 0.2); */
	}

	.logo-cieco {
		width: 12rem;
		margin-left: auto;
	}

	.logo-crihn {
		margin-right: auto;
	}

	.logo-crihn > img {
		max-width: 25rem;
	}
</style>
