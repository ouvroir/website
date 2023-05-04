<script lang="ts">
	import { t, locale, locales } from '$i18n/i18n';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { getRedirectRoute } from '$i18n/routesLangMap';

	const selectLangOnChange = () => {
		const newRoute = getRedirectRoute($page.route.id as string, $page.url.pathname, $locale);
		goto(newRoute, { invalidateAll: true });
	};
</script>

<nav aria-labelledby={`${$t('aria.nav.label')}`}>
	<span>LOGO</span>
	<ul>
		<li><a href={`/${$t('route.base')}`}>{$t('nav.home')}</a></li>
		<li><a href={`/${$t('route.projects')}`}>{$t('nav.projects')}</a></li>
		<li><a href={`/${$t('route.events')}`}>{$t('nav.events')}</a></li>
		<li><a href={`/${$t('route.services')}`}>{$t('nav.services')}</a></li>
		<li><a href={`/${$t('route.about')}`}>{$t('nav.about')}</a></li>
	</ul>

	<div>
		<label for="locale">{$t('nav.locale.label')}</label>
		<select
			id="locale"
			bind:value={$locale}
			on:change={selectLangOnChange}
			aria-label={`${$t('aria.locales.label')}`}
		>
			{#each locales as l}
				<option aria-label={`${$t('aria.locales.' + l)}`} value={l}>{l}</option>
			{/each}
		</select>
	</div>
</nav>
