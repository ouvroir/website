<script lang="ts">
	import { t } from '$lib/i18n/i18n.js';
	export let data;
</script>

<svelte:head>
	<title>{$t('head.services')}</title>
</svelte:head>

<article class="text-body">
	{@html data.html}
</article>

<style>
	article {
		grid-column: 3/7;
	}
</style>
