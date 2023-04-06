<script lang="ts">
	import { page } from '$app/stores';
	import { t } from '$i18n/i18n';
</script>

<svelte:head>
	<title>Error</title>
</svelte:head>

<h1>{$t('error.title')}</h1>

<p>{$page.status}</p>
<p>{$page.error?.message}</p>
