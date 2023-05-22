<script lang="ts">
	import { t } from '$i18n/i18n';
	import ProjectCard from '$components/ProjectCard.svelte';

	export let data;

	console.log(data);
</script>

<svelte:head>
	<title>{$t('aria.home.title')}</title>
</svelte:head>
