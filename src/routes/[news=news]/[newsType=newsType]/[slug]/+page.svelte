<script lang="ts">
	import { page } from '$app/stores';
	import { get, type Readable } from 'svelte/store';
	import { blogs, events, meetings } from '$lib/stores';
	import { ArticleBody, ArticleContainer, ArticleHeader, ArticleAside } from '$components';
	import type { Blog, Event, Meeting } from '$lib/types';
	import { browser } from '$app/environment';

	if (!blogs || !events || !meetings) throw new Error('No data found');

	function contentFromType(type: string) {
		if (type === 'blog') return blogs;
		else if (type === 'event' || type === 'evenement') return events;
		else if (type === 'meeting' || type === 'reunion') return meetings;
		else return null;
	}

	const content = get(
		contentFromType($page.params.newsType) as Readable<Blog[] | Event[] | Meeting[]>
	).find((p) => p.meta.slug === $page.params.slug);

	if (!content) throw new Error('No content found');
</script>

{#if browser}
	<ArticleContainer>
		<ArticleHeader {content} addPattern />
		<ArticleAside {content} />
		<ArticleBody {content} />
	</ArticleContainer>
{/if}
