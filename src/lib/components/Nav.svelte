<script lang="ts">
	import { page } from '$app/stores';
	import { t, rt, locale, getLangFromParam } from '$i18n/i18n';
	import { showPresentation, screenType, showNavMenu } from '$lib/stores';
	import SearchBar from './searchBar.svelte';
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Ouvroir from './Ouvroir.svelte';
	import NavLinks from './NavLinks.svelte';
	import { searchModalOpen } from '$lib/stores';

	let scrollY: number = 0;
	let prevScrollY: number = 0;

	/**
	 * TODO: should make sure that slug is translated
	 */
	const getLangRedirectUrl = (route: string) => {
		let url: string = $t('route.home');

		const getUrl = (name: string) => {
			// if ($page.route.id?.includes('news') || $page.route.id?.includes('projects'))
			// 	return `${$rt(`route.${name}`)}`;

			if ($page.url.pathname.includes('-fr') || $page.url.pathname.includes('-en')) {
				const lang = $page.url.pathname.includes('-fr') ? 'en' : 'fr';
				const slug = $page.params.slug.replace($locale, lang);
				// console.log('computed route', `${$rt(`route.${name}`)}/${slug}`);
				return `${$rt(`route.${name}`)}/${slug}`;
			} else {
				return `${$rt(`route.${name}`)}${$page.params.slug ? '/' + $page.params.slug : ''}`;
			}
		};

		if (route.includes('home')) url = `${$rt('route.home')}`;
		else if (route.includes('news')) {
			if ($page.params.newsType === 'event' || $page.params.newsType === 'evenement')
				url = getUrl('news.event');
			else if ($page.params.newsType === 'blog') url = getUrl('news.blog');
			else if ($page.params.newsType === 'meeting' || $page.params.newsType === 'reunion')
				url = getUrl('news.meeting');
		} else if (route.includes('projects')) url = getUrl('projects');
		else if (route.includes('services')) url = getUrl('services');
		else if (route.includes('about')) {
			if (route.includes('members')) url = getUrl('about.member');
			else url = getUrl('about');
		}
		return url;
	};

	let langRedirectUrl: string = '/';
	let enHref = $locale === 'en' ? $page.url.pathname : langRedirectUrl;
	let frHref = $locale === 'fr' ? $page.url.pathname : langRedirectUrl;

	page.subscribe(() => {
		// reset scroll on page change
		scrollY = 0;

		console.log(getLangFromParam($page.params));

		locale.set(getLangFromParam($page.params));
		langRedirectUrl = $page.route.id ? getLangRedirectUrl($page.route.id) : '/';
		enHref = $locale === 'en' ? $page.url.pathname : langRedirectUrl;
		frHref = $locale === 'fr' ? $page.url.pathname : langRedirectUrl;
	});

	const handleScroll = (e: Event) => {
		const nav = document.querySelector('nav.main');
		const top = nav?.getBoundingClientRect().top ?? 500;

		if ($showPresentation) {
			if (top <= 0) {
				nav?.classList.remove('bottom-nav');
				$showPresentation = false;
			}
		} else {
			// if scrolling down
			if (prevScrollY - scrollY < 0 && scrollY > 30) {
				nav?.classList.add('hide-nav');
			} else {
				nav?.classList.remove('hide-nav');
			}
			prevScrollY = scrollY;
			if (scrollY <= 40) nav?.classList.remove('nav-shadow');
			else if (scrollY > 40) nav?.classList.add('nav-shadow');
		}
	};

	const toggleNavMenu = () => {
		$showNavMenu = !$showNavMenu;
	};

	const handleClickOutside = (e: MouseEvent) => {
		if (!showNavMenu) return;
		const menu = document.querySelector('.nav-menu-container');
		const btn = document.querySelector('.menu-btn');
		if (menu && !menu.contains(e.target) && btn && !btn.contains(e.target)) {
			$showNavMenu = false;
		}
	};

	$: smallScreen = $screenType === 'mobile' || $screenType === 'tablet-vertical';
	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			// Cleanup the event listener when the component is unmounted
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<svelte:window on:scroll={handleScroll} bind:scrollY />

{#if !smallScreen}
	<nav
		aria-labelledby={`${$t('aria.nav.label')}`}
		class={`main ${$showPresentation ? 'bottom-nav' : ''}`}
	>
		<Ouvroir />
		<div class="full-navigation">
			<SearchBar />
			<hr class="navigation-separator" />
			<NavLinks />
			<hr class="navigation-separator" />
			<div class={`locale-container ${$showPresentation ? 'white' : ''}`}>
				<a
					class={`lang-btn ${$locale === 'fr' ? 'active' : ''}`}
					href={frHref}
					rel="alternate"
					on:click={() => {
						locale.set('fr');
					}}
					hreflang="fr">fr</a
				>
				<span>|</span>
				<a
					href={enHref}
					class={`lang-btn ${$locale === 'en' ? 'active' : ''}`}
					rel="alternate"
					on:click={() => {
						locale.set('en');
					}}
					hreflang="en">en</a
				>
			</div>
		</div>
	</nav>
{:else}
	<nav class="nav-header">
		<h1 class="small-logo">Ouvroir</h1>
		<button
			class={`search-btn ${$showNavMenu ? 'menu-btn-active' : ''}`}
			on:click={() => searchModalOpen.set(true)}
		>
			<i class="bx bx-search"></i>
		</button>
		<button class={`menu-btn ${$showNavMenu ? 'menu-btn-active' : ''}`} on:click={toggleNavMenu}
			>Menu</button
		>
	</nav>
	{#if $showNavMenu}
		<div in:slide={{ axis: 'x' }} out:slide={{ axis: 'x', delay: 200 }} class="nav-menu-container">
			<div class="nav-menu">
				<div class="title-container">
					<div class="menu-logo-text">
						<h1 class="menu-title">Ouvroir</h1>
						<p class="menu-subtitle">d’histoire de l'art et <br />de muséologies numériques</p>
					</div>
				</div>
				<NavLinks />
				<!-- <Footer /> -->
				<div class="locale-container">
					<a
						class={`lang-btn ${$locale === 'fr' ? 'active' : ''}`}
						rel="alternate"
						href={frHref}
						hreflang="fr">fr</a
					>
					<span>|</span>
					<a
						href={enHref}
						class={`lang-btn ${$locale === 'en' ? 'active' : ''}`}
						rel="alternate"
						hreflang="en">en</a
					>
				</div>
			</div>
		</div>
	{/if}
{/if}

<style>
	.nav-header {
		display: flex;
		align-items: center;
		padding: 2rem 4%;
		gap: 1rem;
		background-color: var(--clr-green-ouvroir);
		color: white;
	}
	.menu-btn {
		all: unset;
		position: relative;
		width: fit-content;
		font-weight: 600;
		cursor: pointer;
		transition: color ease-in-out 0.2s;
	}
	.menu-btn-active::after {
		position: absolute;
		content: '';
		width: 100%;
		top: 1.3rem;
		left: 0;
		border-bottom: solid 0.1rem var(--clr-accent);
	}
	.search-btn {
		all: unset;
		margin-left: auto;
		position: relative;
		width: fit-content;
		font-weight: 600;
		cursor: pointer;
	}

	.nav-menu-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 50vw;
		height: 100vh;
		background-color: #303030;
		z-index: 10;
		padding: 2rem 4% 2rem 0;
	}

	.nav-menu {
		display: flex;
		flex-direction: column;
		gap: 3rem;
		align-items: end;
		height: 100vh;
	}
	.title-container {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	.menu-logo {
		max-width: 4rem;
		width: 4rem;
	}
	.menu-logo-text {
		color: white;
		font-family: var(--ff-logo);
		width: 100%;
	}
	.menu-title {
		font-size: 1.6rem;
		font-weight: 700;
		text-align: right;
	}
	.menu-subtitle {
		line-height: 1.2rem;
		font-weight: 300;
		margin-top: 0.2rem;
		text-align: right;
	}
	.small-logo {
		font-family: var(--ff-logo);
		font-size: 1.5rem;
		font-weight: 700;
	}
	.lang-btn {
		font-size: 0.95rem;
		position: relative;
	}

	.full-navigation {
		grid-column: 3/-1;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		/* padding: 0 4%; */
	}

	.navigation-separator {
		--radius: 3px;
		--h-margin: 1.6rem;
		margin: 0 var(--h-margin) 0 var(--h-margin);
		display: flex;
		background-color: #303030;
		width: var(--radius);
		height: var(--radius);
		border-radius: 100px;
		border-width: 0;
	}

	.locale-container {
		display: flex;
		/* align-items: end; */
		gap: 1rem;
		/* grid-column: 8/9; */
		/* padding-bottom: var(--nav-links-padding-bottom); */
	}

	.locale-container > *:first-child {
		margin-left: auto;
	}

	.white > * {
		color: white;
	}

	.invisible {
		visibility: hidden;
	}

	.add-bg * {
		color: white;
	}

	.hide-nav {
		transform: translateY(-100%);
	}
	.show-nav {
		transform: translateY(100%);
	}

	/** Small screens */
	@media screen and (max-width: 820px) {
		nav {
			position: static;
			background-color: #303742;
			padding-bottom: 0;
			padding: 2rem 4%;
			height: max-content;
			color: white;
			margin-bottom: 1rem;
		}

		.locale-container {
			height: max-content;
			margin-top: 2rem;
		}

		.locale-container * {
			color: white;
		}

		.nav-menu {
			width: 95%;
		}
	}

	@media screen and (max-width: 480px) {
		.nav-menu-container {
			width: 80vw;
		}
	}
</style>
