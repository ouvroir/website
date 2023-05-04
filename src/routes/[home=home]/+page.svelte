<script lang="ts">
	import { t } from '$i18n/i18n';
	import { page } from '$app/stores';
	import ProjectCard from '$components/ProjectCard.svelte';
	const content = $page.data.content;
</script>

<svelte:head>
	<title>{$t('aria.home.title')}</title>
</svelte:head>

<section>
	<h2 class="fs:700">{$t('home.projects.title')}</h2>
	<div aria-label={$t('aria.projects.carousel')} role="region" class="stack">
		{#each content.projects as project}
			<ProjectCard {project} />
		{/each}
	</div>
</section>

<section class="events">
	<h2>{$t('home.events.title')}</h2>
</section>
