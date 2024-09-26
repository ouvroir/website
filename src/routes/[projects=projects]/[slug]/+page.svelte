<script lang="ts">
	import { page } from '$app/stores';
	import { projects } from '$lib/stores';
	import { browser } from '$app/environment';
	import { ArticleContainer, ArticleHeader, ArticleBody, ArticleAside } from '$components';

	const content = $projects.find((p) => p.meta.slug === $page.params.slug)!;
</script>

<svelte:head>
	<title>{content.meta.title}</title>
</svelte:head>

{#if browser}
	<ArticleContainer>
		<ArticleHeader {content} addPattern />
		<ArticleAside {content} />
		<ArticleBody {content} />
	</ArticleContainer>
{/if}
