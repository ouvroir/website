<script lang="ts">
	import { t } from '$i18n/i18n';
	import ContentList from '$lib/components/ContentList.svelte';
</script>

<svelte:head>
	<title>{$t('head.projects')}</title>
</svelte:head>

<ContentList />
