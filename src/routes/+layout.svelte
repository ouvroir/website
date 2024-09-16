<script lang="ts">
	import { Nav, HomeHero, SearchModal, Footer, Support } from '$lib/components';
	import { page } from '$app/stores';
	import { t } from '$lib/i18n/i18n';
	import { get, type Readable } from 'svelte/store';
	import '$lib/styles/reset.css';
	import '$lib/styles/style.css';
	import '$lib/styles/patterns.css';
	import * as stores from '$lib/stores.js';
	import { searchModalOpen, screenType, showHero, screenWidth, presentation } from '$lib/stores.js';
	import { onMount } from 'svelte';
	import type { SearchIndex } from '$lib/utils/search';

	export let data: null | Record<string, any[]>;

	if (data) {
		stores.allBlogs.set(data.allBlogs);
		stores.allEvents.set(data.allEvents);
		stores.meetings.set(data.meetings);
		stores.allMembers.set(data.allMembers);
		stores.allProjects.set(data.allProjects);
		stores.allResources.set(data.allResources);
		stores.allAbout.set(data.allAbouts);
		stores.allPresentations.set(data.allPresentations);
		stores.allSupports.set(data.allSupports);
		stores.allServices.set(data.allServices);
	}

	let offsetHeight: number;

	$: addGap = $page && $page.route.id === '/[news=news]';

	$: isHome = $page && $page.route.id === '/[home=home]';

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			searchModalOpen.set(!get(searchModalOpen));
		}
	};

	onMount(() => {
		document.body.addEventListener('keydown', handleKeyDown);

		['fr', 'en'].forEach((lang) => {
			const localizedIndexStore: Readable<SearchIndex> = stores[`${lang}SearchIndex`];
			if (!localizedIndexStore) throw new Error(`No search index found for ${lang}`);

			get(localizedIndexStore).add([
				...stores.blogs.localize(lang),
				...stores.events.localize(lang),
				...stores.members.localize(lang),
				...stores.projects.localize(lang),
				...stores.resources.localize(lang),
				stores.about.localize(lang),
				stores.services.localize(lang),
				...get(stores.meetings)
			]);

			get(stores.members).forEach((m) => {
				get(stores.membersHash).push({
					username: m.meta.username,
					name: `${m.meta.firstname} ${m.meta.lastname}`
				});
			});
		});

		return () => {
			document.body.removeEventListener('keydown', handleKeyDown);
		};
	});
</script>

<svelte:head>
	<link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
</svelte:head>

{#if $searchModalOpen}
	<SearchModal />
{/if}

<main
	class={`content ${addGap ? 'addGap' : ''} ${isHome ? 'main-bg-a' : 'main-bg-a'}`}
	bind:offsetHeight
	bind:clientWidth={$screenWidth}
>
	{#if $showHero}
		<HomeHero />
	{/if}
	<Nav contrast={!isHome} />
	<slot />
</main>

<!-- {#if offsetHeight > 800}
	<div class="btt-container">
		<a class="btt-btn" href={$page.url.pathname}>{$t('ui.btt')}</a>
	</div>
{/if} -->

<!-- <Support /> -->

{#if $screenType === 'desktop' || $screenType === 'tablet-horizontal'}
	<Footer />
{/if}

<style>
	.main-bg-a {
		background-color: var(--clr-a);
	}
	.main-bg-b {
		background-color: var(--clr-b);
	}
	.btt-container {
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	.btt-btn {
		color: var(--clr-accent);
		font-family: var(--ff-sans);
		font-weight: 300;
		margin: 0rem 4% 4rem auto;
	}

	@media screen and (min-width: 821px) and (max-width: 1024px) {
		.btt-btn {
			margin: 0rem auto 4rem 4%;
		}
	}
</style>
