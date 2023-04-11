<script lang="ts">
	// import { attributes } from '$ouvroir/projets/common-en.md';
	import { projects } from '$lib/stores/stores';

	const ps = $projects;
</script>

<ul>
	{#each ps as p}
		<li>
			{p.meta.title}
		</li>
	{/each}
</ul>
