<script lang="ts">
	import { generateContentURI } from '$lib/i18n/i18n';

	export let slug: string;
	export let kind: string;
	export let title: string;
	export let text: string;
</script>

<a href={`${generateContentURI(slug, kind)}`} class="search-result-li">
	<h1>{@html title}</h1>
	<p>{@html text}</p>
</a>

<style>
	a {
		text-decoration: none;
		color: var(--clr-a);
	}
	.search-result-li {
		display: block;
		width: 90%;
		margin: auto;
		padding: 1rem;
		padding-left: var(--result-paddingLeft);
		background-color: none;
		border-radius: var(--border-radius);
		transition: background-color 0.1s ease-in-out;
		font-size: var(--fs-300);

		& mark {
			background-color: var(--clr-a);
			color: var(--clr-b);
		}

		&:hover,
		&:focus-visible {
			background-color: var(--clr-a);
			color: var(--clr-b);

			& mark {
				background-color: var(--clr-b);
				color: var(--clr-a);
			}
		}

		& > h1 {
			font-weight: 500;
			margin-bottom: 0.5rem;
			line-height: 1.5rem;
			padding-right: 2rem;
		}

		& > p {
			font-weight: 300;
			line-height: calc(var(--fs-300) + 0.5 * var(--fs-300));
			padding-right: 3rem;
		}
	}
</style>
