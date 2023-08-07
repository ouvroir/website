<script lang="ts">
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';
	import { t, rt, locale } from '$i18n/i18n';
	import { showPresentation } from '$lib/stores';
	import { base } from '$app/paths';
	import { invalidateAll, goto } from '$app/navigation';
	import { getLangFromParam } from '$i18n/i18n';

	/**
	 * TODO: should make sure that slug is translated
	 */
	const getLangRedirectUrl = (route: string) => {
		let url: string = '/accueil';

		console.log('[Nav] locale used in getLangRedirectUrl', $locale);
		const getUrl = (name: string) => {
			return `${base}${$rt(`route.${name}`)}${$page.params.slug ? '/' + $page.params.slug : ''}`;
		};

		if (route.includes('home')) url = `${base}${$rt('route.home')}`;
		else if (route.includes('news')) url = getUrl('news');
		else if (route.includes('projects')) url = getUrl('projects');
		else if (route.includes('services')) url = getUrl('services');
		else if (route.includes('about')) url = getUrl('about');

		return url;
	};

	let active: string;
	let langRedirectUrl: string = '/';
	let enHref = $locale === 'en' ? $page.url.pathname : langRedirectUrl;
	let frHref = $locale === 'fr' ? $page.url.pathname : langRedirectUrl;
	page.subscribe(() => {
		langRedirectUrl = $page.route.id ? getLangRedirectUrl($page.route.id) : '/';
		enHref = $locale === 'en' ? $page.url.pathname : langRedirectUrl;
		frHref = $locale === 'fr' ? $page.url.pathname : langRedirectUrl;

		const match = $page.route.id?.match(/\/\[(\w+)=\1\]/);
		if (match) active = match[1];
		else active = 'home';
	});

	let visible = false;
	setTimeout(() => {
		visible = true;
	}, 500);

	let scrollY: number;
	const handleScroll = (e: Event) => {
		const nav = document.querySelector('nav.main');
		const top = nav?.getBoundingClientRect().top ?? 0;
		// console.log({ top, scrollY });

		if ($showPresentation) {
			if (top === 0) {
				$showPresentation = false;
				$showPresentation = $showPresentation;
			}
		} else {
			if (scrollY <= 40) nav?.classList.remove('nav-shadow');
			else if (scrollY > 40) nav?.classList.add('nav-shadow');
		}
	};
</script>

<svelte:window on:scroll={handleScroll} bind:scrollY />

<nav aria-labelledby={`${$t('aria.nav.label')}`} class="main">
	<a href={`${$t('route.home')}`} class="logo">
		{#if visible}
			<img
				class="logo-img"
				src={`${base}/ouvroir-logo.svg`}
				alt="ll"
				transition:fly={{ x: 60, duration: 1000 }}
			/>
		{:else}
			<img class="logo-img invisible" src={`${base}/ouvroir-logo.svg`} alt="ll" />
		{/if}

		<div class="logo-text">
			<h1>Ouvroir</h1>
			<p>d'histoire de l'art et de muséologie numériques</p>
		</div>
	</a>
	<ul>
		<!-- <li>
			<a class={`nav-link ${active === 'home' ? 'active' : ''}`} href="/">{$t('nav.home')}</a>
		</li> -->
		<li>
			<a class={`nav-link ${active === 'news' ? 'active' : ''}`} href={`${$t('route.news')}`}
				>{$t('nav.news')}</a
			>
		</li>
		<li>
			<a
				class={`nav-link ${active === 'projects' ? 'active' : ''}`}
				href={`${$t('route.projects')}`}>{$t('nav.projects')}</a
			>
		</li>
		<li>
			<a
				class={`nav-link ${active === 'services' ? 'active' : ''}`}
				href={`${$t('route.services.presentation')}`}>{$t('nav.services')}</a
			>
		</li>
		<li>
			<a
				class={`nav-link ${active === 'about' ? 'active' : ''}`}
				href={`${$t('route.about.presentation')}`}>{$t('nav.about')}</a
			>
		</li>
	</ul>
	<div class="locale-container">
		<a
			on:click={() => {
				$locale = 'fr';
				invalidateAll();
				goto(frHref);
			}}
			class={`lang-btn ${$locale === 'fr' ? 'active' : ''}`}
			rel="alternate"
			href={frHref}
			hreflang="fr">fr</a
		>
		<span>|</span>
		<a
			on:click={() => {
				$locale = 'en';
				invalidateAll();
				goto(enHref);
			}}
			href={enHref}
			class={`lang-btn ${$locale === 'en' ? 'active' : ''}`}
			rel="alternate"
			hreflang="en">en</a
		>
	</div>
</nav>

<style>
	.logo {
		display: flex;
		gap: 1rem;
		grid-column: span 2;
		cursor: pointer;
	}

	.lang-btn {
		font-size: 1.1rem;
		position: relative;
	}

	.nav-link {
		position: relative;
	}

	.logo-img {
		/* z-index: -1; */
		max-width: 3.7rem;
		fill: var(--clr-magenta);
		color: var(--clr-magenta);
	}

	.logo-text {
		/* border-left: solid 0.5px var(--clr-magenta); */
		padding-right: 1rem;
		background-color: var(--clr-bg);
		z-index: 1;
	}
	.logo-text > h1 {
		font-family: var(--ff-logo) !important;
		font-weight: 700;
		font-size: 1.6rem;
		margin-bottom: 0.2rem;
		color: var(--clr-magenta);
	}

	.logo-text > p {
		font-size: 0.85rem;
		font-family: var(--ff-logo) !important;
		line-height: 1rem;
		font-weight: 300;
		width: 10rem;
	}

	.locale-container {
		display: flex;
		align-items: end;
		gap: 1rem;
		grid-column: 8/9;
	}

	.locale-container > *:first-child {
		margin-left: auto;
	}

	.invisible {
		visibility: hidden;
	}

	ul > li > a {
		text-transform: uppercase;
		font-size: 1rem;
	}
</style>
