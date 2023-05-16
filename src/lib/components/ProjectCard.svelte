<script lang="ts">
	import { t } from '$i18n/i18n';
	import type { Project } from '$lib/types/Markdown';
	export let project: Project;
</script>

<a class="projectCard" href={`${$t('route.projects')}/${project.slug}`}>
	<div class="stack stack-small hover">
		<h3 class="fs:600">{project.title}</h3>
		<ul class="hstack">
			{#each project.tags as t}
				<li class="fs:300 ff:secondary clr:red">{t}</li>
			{/each}
		</ul>
		<p class="fs:500 fw:light">{project.description}</p>
		<span class="">Depuis {project.since}</span>
	</div>
</a>
