<script lang="ts">
	import { generateContentURI } from '$lib/i18n/i18n';

	export let slug: string;
	export let kind: string;
	export let title: string;
	export let text: string;
</script>

<li>
	<a href={`${generateContentURI(slug, kind)}`} class="search-result-li">
		<h1>{@html title}</h1>
		<p>{@html text}</p>
	</a>
</li>

<style>
	.search-result-li {
		display: block;
		padding: 1rem 2rem;
		background-color: lightgray;
		border-radius: 5px;

		& > h1 {
			font-size: 0.9rem;
			font-weight: 600;
			margin-bottom: 1rem;
		}

		& > p {
			font-size: 0.9rem;
			font-weight: 300;
		}
	}
</style>
