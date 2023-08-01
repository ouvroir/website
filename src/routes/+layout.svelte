<script lang="ts">
	import Nav from '$components/Nav.svelte';
	import Support from '$components/Support.svelte';
	import Footer from '$components/Footer.svelte';
	import Cieco from '$lib/components/logos/Cieco.svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { locale, t } from '$lib/i18n/i18n';
	import { showPresentation } from '$lib/stores.js';
	import '$lib/styles/reset.css';
	import '$lib/styles/style.css';

	export let data;

	let presentationElt: HTMLElement;
	let offsetHeight: number;

	locale.set(data.lang);

	if (!$page.route.id!.includes('home')) {
		showPresentation.set(false);
	}

	$: addGap = $page && $page.route.id === '/[news=news]';
</script>

{#if $showPresentation}
	<section class="presentation-wrapper fill-vh" id="presentation">
		<article
			bind:this={presentationElt}
			class="presentation"
			in:fade={{ delay: 0, duration: 1000 }}
		>
			<p>
				L’Ouvroir d’histoire de l’art et de muséologie numérique de l’Université de Montréal, est un
				laboratoire de recherche destiné à soutenir le travail conduit dans le cadre du Partenariat
				« <em class="s-1erdp_PvG-Jl">Des nouveaux usages des collections dans les musées d’art</em>
				»
				<a href="https://cieco.umontreal.ca/" class="s-1erdp_PvG-Jl">CIÉCO</a> dirigé par Johanne Lamoureux.
			</p>

			<p>
				L’Ouvroir est membre du <em
					>Centre de recherche interuniversitaire sur les humanités numériques</em
				>, CRIHN.
			</p>

			<footer class="presentation-footer">
				<ul class="presentation-logos">
					<li class="logo-cieco">
						<Cieco />
					</li>
					<li class="logo-crihn">
						<img src={`${base}/logos/support/crihn.png`} alt="" />
					</li>
				</ul>
			</footer>
		</article>
	</section>
{/if}

<Nav lang={data.lang} />

<main class={`${addGap ? 'addGap' : ''}`} bind:offsetHeight>
	<slot />
</main>

{#if offsetHeight > 800}
	<div class="btt-container">
		<a class="btt-btn" href={$page.url.pathname}>{$t('ui.btt')}</a>
	</div>
{/if}

<Support content={data.support} />
<Footer />

<style>
	/** */

	.btt-container {
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	.btt-btn {
		color: orangered;
		font-family: var(--ff-sans);
		font-weight: 300;
		margin: 0rem 4% 4rem auto;
	}

	/** Presentation */

	.fill-vh {
		min-height: 75vh;
	}

	.presentation-wrapper {
		grid-column: 2 / -2;
		overflow: hidden;
	}

	.presentation {
		padding-top: 5rem;
		font-size: 1.5rem;
		font-weight: 400;
		line-height: 2.5rem;
		transition: color 1s ease-in;
		background-color: none;
		text-align: center;
	}

	.presentation > p + p {
		margin-top: 2rem;
	}

	.presentation > p:first-child {
		font-size: 1.7rem;
		line-height: 3rem;
		/* inline-size: 60ch; */
		padding: 0 5rem;
	}

	.presentation > p:nth-child(2) {
		font-size: 1.5rem;
		line-height: 2.5rem;
		/* inline-size: 60ch; */
		padding: 0 10rem;
	}

	.presentation-footer {
		display: block;
		height: fit-content;
		background-color: white;
		padding: 0;
		margin-top: 4rem;
	}

	.presentation-logos {
		display: flex;
		width: 100%;
		flex-direction: row;
		justify-content: center;
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
