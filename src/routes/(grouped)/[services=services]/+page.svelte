<script lang="ts">
	import { t } from '$i18n/i18n';
	import { aboutPageTitle } from '$lib/stores.js';
	import { localize } from '$i18n/i18n';

	export let data;

	$: doc = $localize(data.doc)[0];
	$: $aboutPageTitle = doc.meta.title;
</script>

<svelte:head>
	<title>{$t('head.about')}</title>
</svelte:head>

{#if doc.html}
	<article class="text-body">
		{@html doc.html}
	</article>
{/if}
