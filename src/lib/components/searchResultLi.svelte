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
	.search-result-li {
		display: block;
		padding: 1rem;
		padding-left: var(--result-paddingLeft);
		background-color: none;
		transition: background-color 0.1s ease-in-out;
		font-size: var(--fs-result);

		&:hover,
		&:focus-visible {
			background-color: #3037421c;
		}

		& > h1 {
			font-size: 1rem;
			font-weight: 400;
			margin-bottom: 0.1rem;
			line-height: 1.5rem;
			padding-right: 2rem;
		}

		& > p {
			font-size: var(--fs-result-p);
			font-weight: 300;
			line-height: calc(var(--fs-result-p) + 0.5 * var(--fs-result-p));
			padding-right: 3rem;
		}
	}
</style>
