<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { t } from '$i18n/i18n';
	import { showPresentation, screenType } from '$lib/stores.js';

	showPresentation.set(false);

	const aboutLinks = ['presentation', 'team', 'coc', 'support'];
	const servicesLinks = ['presentation', 'equipement', 'reservation', 'meetups'];

	const slugToSection: { [key: string]: string } = {
		presentation: 'presentation',
		membres: 'team',
		equipements: 'equipement',
		equipement: 'equipement',
		reservation: 'reservation',
		reservations: 'reservation',
		meetups: 'meetups',
		rencontres: 'meetups',
		members: 'team',
		'code-of-conduct': 'coc',
		'code-de-conduite': 'coc'
	};

	function scrollIntoView({ target }: { target: HTMLAnchorElement }) {
		const el = document.querySelector(target.getAttribute('href')!);
		if (!el) return;
		el.scrollIntoView({
			behavior: 'smooth'
		});
	}

	$: smallScreen = $screenType === 'mobile' || $screenType === 'tablet-vertical';
	$: section = $page.route.id?.match(/\/\[(\w+)=\1\]/)?.[1];
	$: infoPageTitle = $t(`${section}.title`);
	$: infoPageSection = $t(`${section}.${slugToSection[$page.params.slug]}`);
	$: navLinks = $page.route.id?.includes('about') ? aboutLinks : servicesLinks;
</script>

{#if !smallScreen}
	<nav class="secondary-nav">
		<h1>{infoPageTitle}</h1>
		<ul class="secondary-nav-btns">
			{#each navLinks as l}
				<li>
					{#if l !== 'support'}
						<a
							href={$t(`route.${section}.${l}`)}
							class={`${$page.url.pathname === $t(`route.${section}.${l}`) ? 'active' : ''}`}
						>
							{$t(`${section}.${l}`)}
						</a>
					{:else}
						<a href="#support">
							{$t(`${section}.${l}`)}
						</a>
					{/if}
				</li>
			{/each}
		</ul>
	</nav>
{/if}

<article class="info-page">
	<header class="info-page-header">
		<h1>{infoPageSection}</h1>
	</header>
	{#if smallScreen}
		<select class="dropdown-nav" aria-label="secondary-nav" id="">
			{#each navLinks as l}
				<option on:click={() => goto($t(`route.${section}.${l}`))}>
					{#if l !== 'support'}
						<a
							href={$t(`route.${section}.${l}`)}
							class={`${$page.url.pathname === $t(`route.${section}.${l}`) ? 'active' : ''}`}
						>
							{$t(`${section}.${l}`)}
						</a>
					{/if}
				</option>
			{/each}
		</select>
	{/if}
	<div class={`article-content ${slugToSection[$page.params.slug] === 'team' ? 'bigger' : ''}`}>
		<slot />
	</div>
</article>

<div class="grid-empty-row" />

<style>
	.secondary-nav > h1 {
		/* color: rgb(255, 55, 0); */
		font-weight: 600;
		font-size: 1rem;
		margin-bottom: 1rem;
	}

	.info-page {
		display: contents;
	}

	.info-page-header {
		grid-column: 3/7;
		grid-row: 1;
	}

	.article-content {
		grid-column: 3/7;
		grid-row: 2;
		font-size: 1.1rem;
	}

	.info-page-header > h1 {
		font-size: 2.5rem;
		padding-bottom: 3rem;
	}

	.bigger {
		grid-column: 3/-2;
	}
	.dropdown-nav {
		grid-column: 1/-1;
		height: 2rem;
		margin-bottom: 2rem;
	}

	/** Small screens */
	@media screen and (max-width: 820px) {
		.info-page-header {
			grid-column: 1/-1 !important;
		}
		.info-page-header > h1 {
			padding-bottom: 2rem;
		}
		.article-content {
			grid-column: 1/-1;
			grid-row: 3;
		}
	}
	@media screen and (min-width: 481px) and (max-width: 820px) {
		.dropdown-nav {
			width: 40%;
		}
	}
</style>
