<script lang="ts">
	import { t } from '$i18n/i18n';
	import { aboutPageTitle } from '$lib/stores.js';
	import { services } from '$lib/stores';

	if(!$services) throw new Error('No services data found');

	$: $aboutPageTitle = $services.meta.title;
</script>

<svelte:head>
	<title>{$t('head.about')}</title>
</svelte:head>

{#if $services.html}
	<article class="text-body">
		{@html $services.html}
	</article>
{/if}
