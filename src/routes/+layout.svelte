<script lang="ts">
	import Nav from '$components/Nav.svelte';
	import Support from '$components/Support.svelte';
	import Footer from '$components/Footer.svelte';
	import LandingPage from '$lib/components/LandingPage.svelte';
	import SearchModal from '$lib/components/searchModal.svelte';
	import { page } from '$app/stores';
	import { t } from '$lib/i18n/i18n';
	import { get, type Readable } from 'svelte/store';
	import '$lib/styles/reset.css';
	import '$lib/styles/style.css';
	import * as stores from '$lib/stores.js';
	import {
		searchModalOpen,
		screenType,
		showPresentation,
		screenWidth,
		presentation
	} from '$lib/stores.js';
	import { onMount } from 'svelte';
	import type { SearchIndex } from '$lib/utils/search';

	export let data: null | Record<string, any[]>;

	if (data) {
		stores.allBlogs.set(data.allBlogs);
		stores.allEvents.set(data.allEvents);
		stores.meetings.set(data.meetings);
		stores.allMembers.set(data.allMembers);
		stores.allProjects.set(data.allProjects);
		stores.allAbout.set(data.allAbouts);
		stores.allPresentations.set(data.allPresentations);
		stores.allSupports.set(data.allSupports);
		stores.allServices.set(data.allServices);
	}

	let offsetHeight: number;

	if ($page.route.id && !$page.route.id.includes('home')) {
		stores.showPresentation.set(false);
	}

	$: addGap = $page && $page.route.id === '/[news=news]';

	onMount(() => {
		console.log(get(stores.meetings));

		['fr', 'en'].forEach((lang) => {
			const localizedIndexStore: Readable<SearchIndex> = stores[`${lang}SearchIndex`];
			if (!localizedIndexStore) throw new Error(`No search index found for ${lang}`);

			get(localizedIndexStore).add([
				...stores.blogs.localize(lang),
				...stores.events.localize(lang),
				...stores.members.localize(lang),
				...stores.projects.localize(lang),
				stores.about.localize(lang),
				stores.services.localize(lang),
				...get(stores.meetings)
			]);
		});
		console.log('======== Done creating search indexes');
	});
</script>

<svelte:head>
	<link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
</svelte:head>

{#if $searchModalOpen}
	<SearchModal />
{/if}

{#if $showPresentation && $presentation}
	<LandingPage />
{/if}

<Nav />

<main class={`${addGap ? 'addGap' : ''}`} bind:offsetHeight bind:clientWidth={$screenWidth}>
	<slot />
</main>

{#if offsetHeight > 800}
	<div class="btt-container">
		<a class="btt-btn" href={$page.url.pathname}>{$t('ui.btt')}</a>
	</div>
{/if}

<Support />

{#if $screenType === 'desktop' || $screenType === 'tablet-horizontal'}
	<Footer />
{/if}

<style>
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
