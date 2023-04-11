<script lang="ts">
	import { locale } from '$i18n/i18n';
	import { projects } from '$lib/stores/stores';

	export let data;

	projects.set(data.projects);

	// console.log('projects', data.projects);
</script>

<h1>Our projects</h1>

<ul>
	{#each data.projects as p}
		<li>
			{p.meta.title}
		</li>
	{/each}
</ul>
