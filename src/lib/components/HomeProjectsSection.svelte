<script lang="ts">
	import { t } from '$lib/i18n/i18n';
	import { projects } from '$lib/stores';
</script>

<section class="projects-section-wrapper">
	<header>
		<h1>Les autres projets du laboratoire</h1>
	</header>

	<ul class="projects-container">
		{#each $projects.filter((p) => !p.meta.cieco) as p}
			<li class="project-card">
				<a href={`/projets/${p.meta.slug}`}>
					<h2>{p.meta.title}</h2>
					<p>{p.meta.description}</p>
				</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	:root {
		--padding: 12rem;
		--top: -2rem;
	}
	section {
		position: relative;
		top: var(--top);
		grid-column: full;
		padding-top: calc(var(--padding) + var(--top) * -1);
		/* padding-bottom: calc(var(--padding) + var(--top) * 2); */
		display: grid;
		grid-template-columns: subgrid;
		background-color: var(--clr-b);
	}

	/* section::after {
		--s: 100%;
		content: '';
		position: absolute;
		top: 100%;
		left: 0;
		width: 100%;
		height: 5rem;
		background-color: var(--clr-b);
		z-index: 3;
		background: linear-gradient(to bottom left, var(--clr-b) 50%, transparent 50%) 0 / var(--s)
			var(--s);
	}

	section::before {
		content: '';
		position: absolute;
		top: calc(100% + 5rem - 1rem);
		left: 0;
		width: 99%;
		height: 3px;
		background: transparent;
		transform: rotate(3.4deg);
		transform-origin: 90rem 6rem;
		box-shadow: 0px 20px 20px var(--clr-b);
		pointer-events: none;
	} */

	header {
		grid-column: feature;
		display: flex;
		flex-direction: row;
		margin-bottom: 8rem;

		& h1 {
			margin-left: auto;
			font-size: var(--fs-700);
			font-weight: 600;
			color: var(--clr-b);
			background-color: var(--clr-a);
			padding: 1rem 1.5rem;
			box-shadow: 2px 2px 1.5rem var(--clr-a);
		}
	}

	ul {
		grid-column: feature;
		columns: 3 25rem;
		column-gap: 3rem;
		column-fill: balance;
		padding-bottom: calc(var(--padding) + var(--top));
	}

	.project-card {
		break-inside: avoid;
		background-color: var(--clr-a);
		border-radius: var(--border-radius);
		padding: 1.5rem 1rem;
		/* width: 20rem; */
		margin-bottom: 2rem;
		transition: box-shadow 0.2s ease-in-out;
	}

	.project-card:hover {
		box-shadow: 2px 2px 1.5rem var(--clr-a);
	}

	.project-card a {
		color: var(--clr-b);
		text-decoration: none;
		cursor: pointer;
	}

	.project-card h2 {
		--fs: var(--fs-400);
		font-size: var(--fs);
		font-weight: 700;
		line-height: calc(var(--fs) * var(--lh-ratio-s));
		margin-bottom: 1rem;
	}

	.project-card p {
		--fs: var(--fs-300);
		font-size: var(--fs);
		line-height: calc(var(--fs) * var(--lh-ratio-s));
		font-weight: 400;
	}
</style>
