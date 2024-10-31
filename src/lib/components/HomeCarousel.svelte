<script lang="ts">
	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';
	import { getRandomPattern } from '$lib/utils/random';
	import { getFirstParagraph } from '$lib/utils/helpers';
	import { projects } from '$lib/stores';
</script>

<section class="carousel-container">
	{#if browser}
		<Carousel arrows={false} autoplay autoplayDuration={5000}>
			{#each $projects.filter((p) => p.meta.cieco) as p}
				<div class={`item ${getRandomPattern()} patterns-contrast-1 patterns-size-m`}>
					<div class="header">
						<h1>{p.meta.title}</h1>
						<p>
							{@html getFirstParagraph(p.html)?.innerHTML}
						</p>
					</div>
				</div>
			{/each}
		</Carousel>
	{/if}
</section>

<style>
	:root {
		--carousel-height: 100vh;
		--carousel-cb: var(--clr-b);
		--carousel-ca: var(--clr-a);
	}
	.carousel-container,
	.item {
		height: var(--carousel-height);
		border-radius: var(--pattern-bradius);
	}

	.carousel-container {
		z-index: 2;
		position: relative;
		margin-top: 10rem;
		grid-column: full;
		background-color: var(--carousel-ca);
		box-shadow:
			0 -10px 20px -10px var(--clr-b),
			/* Top shadow */ 0 10px 20px -10px var(--clr-a); /* Bottom shadow */
	}

	.item {
		grid-column: full;
	}

	.header {
		/* position: relative; */
		padding-top: min(10%, 10rem);
		padding-left: min(10%, 20rem);
		padding-right: min(10%, 5rem);
		display: flex;
		flex-direction: column;
		gap: 1rem;

		& h1,
		& p {
			color: var(--carousel-cb);
			background-color: var(--carousel-ca);
			width: fit-content;
			padding: 0.7rem 1rem;
		}

		& h1 {
			font-size: 3rem;
			font-weight: 700;
		}

		& p {
			--lh: 1.6rem;
			font-size: 1.2rem;
			line-height: var(--lh);
			font-weight: 400;
			width: min(100%, 55ch);
		}
	}
</style>
