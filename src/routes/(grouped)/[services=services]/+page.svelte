<script lang="ts">
	import { t } from '$i18n/i18n';
	import { aboutPageTitle } from '$lib/stores.js';
	import { services } from '$lib/stores';
	import { wrapContentBetweenH2s } from '$lib/utils/helpers';

	if (!$services) throw new Error('No services data found');

	$: $aboutPageTitle = $services.meta.title;
</script>

<svelte:head>
	<title>{$t('head.about')}</title>
</svelte:head>

{#if $services.html}
	<article class="text-body" use:wrapContentBetweenH2s>
		{@html $services.html}
	</article>
{/if}

<style>
	:global(.text-body iframe) {
		width: 100%;
		height: 40rem;
		margin-bottom: 2rem;
		border-radius: var(--border-radius);
	}
</style>
