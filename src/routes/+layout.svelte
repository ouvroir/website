<script lang="ts">
	import Nav from '$components/Nav.svelte';
	import Support from '$components/Support.svelte';
	import Footer from '$components/Footer.svelte';
	import LandingPage from '$lib/components/LandingPage.svelte';
	import SearchModal from '$lib/components/searchModal.svelte';
	import { page } from '$app/stores';
	import { t } from '$lib/i18n/i18n';
	import { get } from 'svelte/store';
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
		console.log('======== Creating fr search index');
		get(stores.frSearchIndex).add([
			...stores.blogs.localize('fr'),
			...stores.events.localize('fr'),
			...stores.members.localize('fr'),
			...stores.projects.localize('fr'),
			stores.about.localize('fr'),
			stores.services.localize('fr'),
			...get(stores.meetings)
		]);
		console.log('======== Creating en search index');
		get(stores.enSearchIndex).add([
			...stores.blogs.localize('en'),
			...stores.events.localize('en'),
			...stores.members.localize('en'),
			...stores.projects.localize('en'),
			stores.about.localize('en'),
			stores.services.localize('en'),
			...get(stores.meetings)
		]);
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
