<script lang="ts">
	import ProjectLItem from '$lib/components/ProjectLItem.svelte';
	import FilterPanel from '$lib/components/FilterPanel.svelte';
	import { showPresentation } from '$lib/stores.js';

	import type { Project } from '$lib/types.js';
	import { t } from '$i18n/i18n.js';
	export let data;

	showPresentation.set(false);

	const tags = data.projects
		.reduce((acc, p) => {
			p.meta.tags.forEach((t: string) => {
				if (!acc.includes(t)) acc.push(t);
			});
			return acc;
		}, [])
		.sort();

	let selectedTags: string[] = [];

	const filterTags = (d: Project, selectedTags: string[]) => {
		if (selectedTags.length === 0) return true;
		let contains = false;
		d.meta.tags.forEach((t) => {
			if (selectedTags.includes(t)) contains = true;
		});
		return contains;
	};

	$: ciecoProjects = data.projects
		.filter((d) => d.meta.tags.includes('CIÉCO'))
		.filter((d) => filterTags(d, selectedTags));

	$: projects = data.projects
		.filter((d) => !d.meta.tags.includes('CIÉCO'))
		.filter((d) => filterTags(d, selectedTags));
</script>

<svelte:head>
	<title>{$t('head.projects')}</title>
</svelte:head>

<FilterPanel {tags} bind:selectedTags />

{#if ciecoProjects.length > 0}
	<div class="section-title">
		<h2>Livrables CIÉCO</h2>
	</div>
{/if}
<ul class="pinned-projects">
	{#each ciecoProjects as p}
		<ProjectLItem data={p} header={false} />
	{/each}
</ul>

{#if projects.length > 0}
	<div class="section-title">
		<h2>Recherches et développements</h2>
	</div>
{/if}
<!-- 
<h2 class="section-title">Ouvroir</h2> -->
<ul class="projects-list">
	{#each projects as p}
		<ProjectLItem data={p} />
	{/each}
</ul>

<style>
	/* .empty {
		grid-column: 2/-1;
		border-top: solid 0.5px lightgrey;
		margin-bottom: 2rem;
	} */

	.section-title {
		position: relative;
		/* right: 4rem; */
		grid-column: 2/5;
		height: 100%;
		/* border-right: solid 0.05rem orangered; */
		padding-right: 0rem;
		margin-top: var(--filter-margin);
		margin-bottom: 2rem;
	}

	h2 {
		font-size: 1rem;
		padding-top: 0.5rem;
		/* margin-bottom: 1rem; */
		/* text-align: right; */
		/* color: orangered; */
		/* text-decoration: underline 0.1rem orangered; */
		color: orangered;
		grid-column: 2;
		font-weight: 300;
	}

	/** Small screens */
	@media screen and (max-width: 820px) {
		.section-title {
			grid-column: 1/-1;
		}
	}
</style>
