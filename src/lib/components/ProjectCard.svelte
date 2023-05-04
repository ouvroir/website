<script lang="ts">
	import type { Project } from '$lib/types/Markdown';
	export let project: Project;
</script>

<div class="stack stack-small">
	<h3 class="fs:600">{project.title}</h3>
	<ul class="hstack">
		{#each project.tags as t}
			<li class="fs:300 ff:secondary clr:red">{t}</li>
		{/each}
	</ul>
	<p class="fs:500 fw:light">{project.description}</p>
	<span class="">Depuis {project.since}</span>
</div>
