<script lang="ts">
	import Nav from '$components/Nav.svelte';
	import Support from '$components/Support.svelte';
	import Footer from '$components/Footer.svelte';
	import LandingPage from '$lib/components/LandingPage.svelte';
	import SearchModal from '$lib/components/searchModal.svelte';
	import { page } from '$app/stores';
	import { t } from '$lib/i18n/i18n';
	import '$lib/styles/reset.css';
	import '$lib/styles/style.css';
	import {
		allBlogs,
		allEvents,
		allMembers,
		meetings,
		allProjects,
		allAbout,
		allPresentations,
		allServices,
		allSupports,
		presentation,
		searchModalOpen,
		searchIndex,
		showPresentation,
		screenType,
		screenWidth
	} from '$lib/stores.js';
	import { createSearchIndex } from '$lib/utils/search';
	import { onMount } from 'svelte';

	export let data: null | Record<string, any[]>;

	if (data) {
		$allBlogs = data.allBlogs;
		$allEvents = data.allEvents;
		$meetings = data.meetings;
		$allMembers = data.allMembers;
		$allProjects = data.allProjects;
		$allAbout = data.allAbouts;
		$allPresentations = data.allPresentations;
		$allSupports = data.allSupports;
		$allServices = data.allServices;
	}

	let offsetHeight: number;

	if ($page.route.id && !$page.route.id.includes('home')) {
		showPresentation.set(false);
	}

	$: addGap = $page && $page.route.id === '/[news=news]';

	onMount(() => {
		console.log('Creating search index');
		$searchIndex = createSearchIndex([
			...$allBlogs,
			...$allEvents,
			...$meetings,
			...$allMembers,
			...$allProjects,
			...$allAbout,
			...$allPresentations,
			...$allSupports,
			...$allServices
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
