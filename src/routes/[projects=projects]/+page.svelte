<script lang="ts">
	import { t } from '$i18n/i18n';
	import { writable } from 'svelte/store';
	import { projects } from '$lib/stores';
	import { ProjectLItem, FilterPanel, GenericCard } from '$lib/components';
	import { getTagsfromContent, contentHasTags } from '$lib/utils/helpers';
	import { setContext } from 'svelte';

	const selectedTags = writable([] as string[]);
	const tags = writable(getTagsfromContent($projects) as string[]);
	const selectedDocTypes = writable(['project'] as string[]);
	setContext('types', { selectedDocTypes, selectedTags, tags, selectableTags: tags });

	$: ciecoProjects = $projects
		.filter((d) => d.meta.cieco)
		.filter((d) => contentHasTags(d, $selectedTags));

	$: projs = $projects.filter((d) => !d.meta.cieco).filter((d) => contentHasTags(d, $selectedTags));
</script>

<svelte:head>
	<title>{$t('head.projects')}</title>
</svelte:head>

<FilterPanel />

<ul class="column-layout">
	{#if ciecoProjects.length > 0}
		<li>
			<h2 id="#cieco-title">{$t('projects.cieco.title')}</h2>
		</li>
		{#each ciecoProjects as content, i}
			<GenericCard {content} hideType />
		{/each}
	{/if}
	{#if projs.length > 0}
		<li>
			<h2 id="title-rd">{$t('projects.rd.title')}</h2>
		</li>
		{#each projs as content}
			<GenericCard {content} hideType />
		{/each}
	{/if}
</ul>

<style>
	/* .empty {
		grid-column: 2/-1;
		border-top: solid 0.5px lightgrey;
		margin-bottom: 2rem;
	} */

	.column-layout h2 {
		width: max-content;
		padding-right: 0rem;
		font-size: var(--fs-600);
		font-weight: 700;
		margin-bottom: 2rem;
		min-height: 6%;
		line-height: 3rem;
		color: var(--clr-a);
		background-color: var(--clr-b);
		padding: 0.5rem 1rem;
	}

	#title-rd {
		break-before: column;
	}
</style>
