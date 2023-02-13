<script lang="ts">
	import { t, locale, locales } from '$lib/i18n/i18n';
	import { page } from '$app/stores';

	['events', 'projects', 'services', 'about'].includes($page.params.events)
		? locale.set('en')
		: locale.set('fr');
</script>

<div class="nav">
	<div class="home">Ouvroir</div>
	<div class="nav-btn"><a href="/">{$t('nav.home')}</a></div>
	<div class="nav-btn"><a href={`/${$t('nav.route.projects')}`}>{$t('nav.projects')}</a></div>
	<div class="nav-btn"><a href={`/${$t('nav.route.events')}`}>{$t('nav.events')}</a></div>
	<div class="nav-btn"><a href="/services">{$t('nav.services')}</a></div>
	<div class="nav-btn"><a href={`/${$t('nav.route.about')}`}>{$t('nav.about')}</a></div>
	<select class="locale-select" bind:value={$locale}>
		{#each locales as l}
			<option value={l}>{l}</option>
		{/each}
	</select>
</div>

<style>
	a {
		text-decoration: none;
		color: black;
	}
	.nav {
		display: flex;
		gap: 1.5rem;
		align-items: baseline;
		padding: 0 1.5rem 0 1.5rem;
	}

	.home {
		width: 10%;
		font-size: xx-large;
	}

	.nav-btn {
		font-size: large;
	}

	.locale-select {
		width: 3rem;
		margin-left: auto;
	}
</style>
