<script lang="ts">
	import '$lib/styles/reset.css';
	import '$lib/styles/styles.css';
	import Nav from '$lib/components/Nav.svelte';
	import { t, locale } from '$i18n/i18n';

	export let data;

	locale.set(data.lang as string);
</script>

<header class="sticky-banner">
	<h1 class="banner-title">Ouvroir</h1>
	<h2 class="banner-subtitle">{@html $t('header.subtitle')}</h2>
	<p class="banner-description">
		{$t('header.description')} <a href="http://www.cieco.co/"><abbr>CIÉCO</abbr></a>.
	</p>
</header>

<main>
	<header>
		<Nav />
	</header>
	<slot />
</main>

<footer />
