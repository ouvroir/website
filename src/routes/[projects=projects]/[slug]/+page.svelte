<script lang="ts">
	// import { attributes } from '$ouvroir/projets/common-en.md';
	import { projects } from '$lib/stores/stores';
	import type { MarkdownAttr } from '$lib/types/Markdown';

	const ps = $projects as [{ slug: string; fname: string; meta: MarkdownAttr }];
</script>

<ul>
	{#each ps as p}
		<li>
			{p.meta.title}
		</li>
	{/each}
</ul>
