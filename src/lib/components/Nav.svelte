<script lang="ts">
	import { t, locale, locales } from '$lib/i18n/i18n';
	import { page } from '$app/stores';

	['events', 'projects', 'services', 'about'].includes($page.params.events)
		? locale.set('en')
		: locale.set('fr');
</script>

<nav aria-labelledby={`${$t('aria.nav.label')}`}>
	<ul>
		<li><a href="/">{$t('nav.home')}</a></li>
		<li><a href={`/${$t('route.projects')}`}>{$t('nav.projects')}</a></li>
		<li><a href={`/${$t('route.events')}`}>{$t('nav.events')}</a></li>
		<li><a href={`/${$t('route.services')}`}>{$t('nav.services')}</a></li>
		<li><a href={`/${$t('route.about')}`}>{$t('nav.about')}</a></li>
	</ul>

	<label for="locale">{$t('nav.locale.label')}</label>
	<select id="locale" bind:value={$locale} aria-label={`${$t('aria.locales.label')}`}>
		{#each locales as l}
			<option aria-label={`${$t('aria.locales.' + l)}`} value={l}>{l}</option>
		{/each}
	</select>
</nav>
