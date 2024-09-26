<script lang="ts">
	import { resources } from '$lib/stores';
	import { ArticleBody, ArticleHeader, ArticleAside } from '$lib/components';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	const content = $resources.find((p) => p.meta.slug === $page.params.slug)!;
</script>

{#if browser}
	<article>
		<ArticleHeader {content} />
		<ArticleAside {content} />
		<ArticleBody {content} />
	</article>
{/if}
