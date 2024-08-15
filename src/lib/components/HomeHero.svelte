<script lang="ts">
	import { fade } from 'svelte/transition';
	import Patterns from './Patterns.svelte';
	import { presentation } from '$lib/stores';

	if (!$presentation) throw new Error('No presentation data found');
</script>

<section class="hero-container" id="presentation">
	<Patterns className="left-feature" />
	<div class="hero">
		<div class="hero-header">
			<div>
				<h1 class="title">Ouvroir</h1>
				<h2 class="subtitle">d’histoire de l’art <br /> et de muséologie numériques</h2>
			</div>
		</div>
		<article class="hero-content" out:fade={{ duration: 500 }}>
			{@html $presentation.html}
		</article>
	</div>
</section>

<style>
	.hero-container {
		--radius: 40px;

		min-height: 100vh;
		position: relative;
		grid-column: full;
		align-items: center;
		display: grid;
		grid-template-columns: subgrid;
		color: var(--clr-a);
		background-color: var(--clr-b);
		/* border-radius: 30px; */
		border-bottom-left-radius: var(--radius);
		border-top-right-radius: var(--radius);
		margin-bottom: var(--hero-margin-bottom);

		box-shadow: 2px 2px 2rem var(--clr-b);
	}

	.hero {
		grid-column: content-start / full-end;
		/* padding-bottom: 2rem; */
	}

	.hero-header {
		font-family: var(--ff-logo) !important;
		& h1 {
			letter-spacing: 0.4rem;
			font-size: 6rem;
			font-weight: 700;
			margin-bottom: 0.2rem;
		}

		& .subtitle {
			font-size: 3rem;
			font-weight: 300;
			margin-bottom: 1.5rem;
			line-height: 3.5rem;
			margin-left: 0.5rem;
		}
	}
	.hero-content {
		width: 80ch;
		margin-left: 0.5rem;
		/* padding-bottom: 2rem; */

		& > p {
			font-size: 1.2rem;
			font-weight: 400;
			line-height: 1.8rem;
		}

		& > p + p {
			margin-top: 1rem;
		}

		& a {
			color: var(--clr-a);
			text-decoration: underline 0.2rem var(--clr-a);
		}
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

		.hero-header {
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
		.hero-header {
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
