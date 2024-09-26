<script lang="ts">
	import type { Blog, Event, Meeting, Resource, Project } from '$lib/types';
	import { extractContentFromHTML } from '$lib/utils/helpers';
	import { onMount } from 'svelte';

	export let content: Blog | Event | Meeting | Resource | Project;

	let doc: string;
	onMount(() => {
		const data = extractContentFromHTML(content.html, ['h1', 'p']);
		doc = data.doc;
	});
</script>

<section class="text-body">
	{@html doc}
</section>
