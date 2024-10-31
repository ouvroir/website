<script lang="ts">
	import { fade } from 'svelte/transition';
	import Patterns from './Patterns.svelte';
	import { presentation } from '$lib/stores';

	if (!$presentation) throw new Error('No presentation data found');
</script>

<section class="hero-container" id="presentation">
	<Patterns className="left-feature" />
	<div class="hero">
		<header class="hero-header">
			<div>
				<h1 class="title">Ouvroir</h1>
				<h2 class="subtitle">d’histoire de l’art <br /> et de muséologie numériques</h2>
			</div>
		</header>
		<article class="hero-content" out:fade={{ duration: 500 }}>
			{@html $presentation.html}
		</article>
	</div>
</section>

<style>
	.hero-container {
		--radius: 40px;

		height: max-content;
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
		z-index: 5;
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
		width: min(100%, 80ch);
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

	@media screen and (max-width: 700px) {
		.hero {
			grid-column: full;
			padding: 3rem 1rem;
		}
		.hero-header h1 {
			font-size: 4rem;
		}
		.hero-header .subtitle {
			font-size: var(--fs-500);
			line-height: 2rem;
			margin-bottom: 0;
		}

		.hero-header {
			margin-bottom: 3rem;
			grid-column: 2/8;
		}
	}
</style>
