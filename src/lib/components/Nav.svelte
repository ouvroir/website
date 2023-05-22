<script lang="ts">
	import { fly } from 'svelte/transition';
	import { t, locale, locales } from '$i18n/i18n';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { getRedirectRoute } from '$i18n/routesLangMap';
	import Logo from '$lib/assets/ouvroir-logo.svg';

	const selectLangOnChange = () => {
		const newRoute = getRedirectRoute($page.route.id as string, $page.url.pathname, $locale);
		goto(newRoute, { invalidateAll: true, noScroll: true });
	};

	let visible = false;
	setTimeout(() => {
		visible = true;
	}, 1000);
</script>

<nav aria-labelledby={`${$t('aria.nav.label')}`}>
	{#if visible}
		<img class="logo" src={Logo} alt="ll" transition:fly={{ x: 150, duration: 2000 }} />
	{:else}
		<img class="logo invisible" src={Logo} alt="ll" />
	{/if}

	<div class="logo-text">
		<h1>OUVROIR</h1>
		<p>d'histoire de l'art et de muséologie numériques</p>
	</div>
	<ul>
		<li><a href={`/${$t('route.base')}`}>{$t('nav.home')}</a></li>
		<li><a href={`/${$t('route.projects')}`}>{$t('nav.projects')}</a></li>
		<li><a href={`/${$t('route.services')}`}>{$t('nav.services')}</a></li>
		<li><a href={`/${$t('route.about')}`}>{$t('nav.about')}</a></li>
	</ul>
	<div class="locale-container">
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

<style>
	.locale-container {
		display: flex;
		align-items: end;
		gap: 1rem;
	}

	.invisible {
		visibility: hidden;
	}

	.logo {
		max-width: 3.5rem;
		fill: var(--clr-magenta);
		color: var(--clr-magenta);
	}

	.logo-text {
		/* border-left: solid 0.5px var(--clr-magenta); */
		padding-right: 1rem;
		background-color: white;
		z-index: 1;
	}
	.logo-text > h1 {
		font-size: 1.3rem;
		margin-bottom: 0.2rem;
	}

	.logo-text > p {
		font-size: 0.8rem;
		font-family: var(--ff-ui);
		line-height: 1rem;
		font-weight: 200;
		width: 10rem;
	}
</style>
