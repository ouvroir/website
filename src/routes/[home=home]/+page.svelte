<script lang="ts">
	import { t, locale } from '$i18n/i18n';
</script>

<svelte:head>
	<title>{$t('aria.home.title')}</title>
</svelte:head>

<section class="projects">
	<h2>{$t('home.projects.title')}</h2>
	<div aria-label={$t('aria.projects.carousel')} role="region" class="projects-carousel" />
</section>

<section class="events">
	<h2>{$t('home.events.title')}</h2>
</section>
