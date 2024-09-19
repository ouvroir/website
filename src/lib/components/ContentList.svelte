<script lang="ts">
	import { t } from '$lib/i18n/i18n';
	import { FilterPanel, GenericCard } from '$lib/components';
	import { onMount, setContext } from 'svelte';
	import { derived, writable } from 'svelte/store';
	import { building } from '$app/environment';
	import { resources, projects, meetings, events, blogs } from '$lib/stores';
	import { sortContentByDate, getTagsfromContent, contentHasTags } from '$lib/utils/helpers';
	import type { Project, Blog, Event, Resource, Meeting } from '$lib/types';
	import { page } from '$app/stores';

	type ContentType = Project | Blog | Event | Resource | Meeting;

	const selectedTags = writable([] as string[]);
	const selectedDocTypes = writable(building ? ['event', 'blog', 'meeting'] : ['event', 'blog']);
	const disabledNewsTypes = writable([] as string[]);
	const tags = writable(getTagsfromContent($resources));

	let filtered: Array<ContentType>, otherContent: Array<Project>;

	let pageName: 'project' | 'resource' | 'news';
	switch ($page.route.id) {
		case '/[projects=projects]':
			pageName = 'project';
			filtered = $projects
				.filter((d) => !d.meta.cieco)
				.filter((d) => contentHasTags(d, $selectedTags)) as Project[];
			otherContent = $projects
				.filter((d) => !d.meta.cieco)
				.filter((d) => contentHasTags(d, $selectedTags)) as Project[];
			break;
		case '/[resources=resources]':
			pageName = 'resource';
			filtered = $resources.filter((d) => contentHasTags(d, $selectedTags)) as Resource[];
			break;
		case '/[news=news]':
			pageName = 'news';
			filtered = [...$events, ...$blogs, ...$meetings]
				.filter((d) => $selectedDocTypes.includes(d.meta.kind) && contentHasTags(d, $selectedTags))
				.sort((a, b) => sortContentByDate(a, b));
			break;
		default:
			throw new Error('Unknown page');
	}

	setContext('types', {
		selectedDocTypes,
		disabledNewsTypes,
		selectedTags,
		tags,
		selectableTags: tags
	});

	onMount(() => {
		if (window.location.hash) {
			const el = document.getElementById(window.location.hash.slice(1));
			if (el) {
				el.scrollIntoView();
			}
		}
	});
</script>

<FilterPanel />

<div class="tags-container">
	<ul />
</div>

<ul class="column-layout">
	{#if pageName === 'project'}
		{#if filtered.filter((c) => c.meta.cieco).length > 0}
			<li>
				<h2 id="#cieco-title">{$t('projects.cieco.title')}</h2>
			</li>
			{#each filtered as content, i}
				<GenericCard {content} hideType />
			{/each}
		{/if}
		{#if otherContent.length > 0}
			<li>
				<h2 id="title-rd">{$t('projects.rd.title')}</h2>
			</li>
			{#each otherContent as content}
				<GenericCard {content} hideType />
			{/each}
		{/if}
	{:else}
		{#each filtered as content, i}
			<GenericCard {content} hideType={pageName === 'resource'} />
		{/each}
	{/if}
</ul>
