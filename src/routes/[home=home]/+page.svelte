<script lang="ts">
	import { t } from '$i18n/i18n';
	import ProjectCard from '$components/ProjectCard.svelte';

	export let data;
	const content = data.content;
</script>

<svelte:head>
	<title>{$t('aria.home.title')}</title>
</svelte:head>

<section class="home-projects">
	<h2 class="fs:600 clr:red">{$t('home.projects.title')}</h2>
	<div aria-label={$t('aria.projects.carousel')} role="region">
		{#each content.projects as project}
			<ProjectCard {project} />
		{/each}
	</div>
</section>

<section class="events">
	<h2>{$t('home.events.title')}</h2>
</section>
