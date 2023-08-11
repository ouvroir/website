<script lang="ts">
	import { page } from '$app/stores';
	import { t, rt, locale } from '$i18n/i18n';
	import { showPresentation } from '$lib/stores';
	import { base } from '$app/paths';
	import { invalidateAll, goto } from '$app/navigation';
	import Ouvroir from './Ouvroir.svelte';

	/**
	 * TODO: should make sure that slug is translated
	 */
	const getLangRedirectUrl = (route: string) => {
		let url: string = '/accueil';

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

<nav
	aria-labelledby={`${$t('aria.nav.label')}`}
	class={`main ${$showPresentation ? 'add-bg' : ''}`}
>
	<Ouvroir />
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
	.lang-btn {
		font-size: 1.1rem;
		position: relative;
	}

	.nav-link {
		position: relative;
	}

	ul {
		width: max-content;
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

	.add-bg {
		background-color: var(--bg-clr-presentation);
	}

	.add-bg * {
		color: white;
	}
</style>
