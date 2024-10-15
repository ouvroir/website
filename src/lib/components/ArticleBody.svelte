<script lang="ts">
	import type { Blog, Event, Meeting, Resource, Project } from '$lib/types';
	import { extractContentFromHTML } from '$lib/utils/helpers';
	import { onMount } from 'svelte';

	export let content: Blog | Event | Meeting | Resource | Project;

	let extracts: string[], doc: string, h1: string, p: string;

	onMount(() => {
		const data = extractContentFromHTML(content.html, ['h1', 'p']);
		extracts = data.extracts;
		doc = data.doc;
		p = extracts[1];
	});
</script>

<section class="text-body">
	{#if content.meta.kind !== 'meeting'}
		<p class="frist-paragraph">{@html p}</p>
	{/if}
	{@html doc}
</section>

<style>
	.frist-paragraph {
		--padding-v: 1rem;
		font-weight: 500;
		font-size: var(--fs-300);
		background-color: var(--ca);
		/* left: calc(var(--padding-v) * -1);
		padding: 0.7rem var(--padding-v);
		color: var(--cb);
		border: solid 0.5rem var(--cb); */
		margin-bottom: 2rem;
	}
</style>
