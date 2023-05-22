<script lang="ts">
	import type { Project } from '$lib/types/Markdown';

	import logo from '$lib/assets/righettino_landing_screenshot.png';

	export let data;

	const project = data as Project;
	console.log(project);
</script>

<header>
	<img src={logo} alt="aa" />
	<h1>{project.title}</h1>
	<ul class="tags">
		{#each project.tags as t}
			<li>{t}</li>
		{/each}
	</ul>
	<p class="project-description">
		{project.description}
	</p>

	<div class="infos">
		<div class="info">
			<span class="clr:light">Since</span>
			<span>{project.since}</span>
		</div>
		<div class="info">
			<span class="clr:light">Project manager</span>
			<span>{project.lead}</span>
		</div>
		<div class="info">
			<span class="clr:light">Team</span>
			<ul>
				{#each project.team as t}
					<li>{t}</li>
				{/each}
			</ul>
		</div>
	</div>
</header>

<article>
	{@html project.html}
</article>
