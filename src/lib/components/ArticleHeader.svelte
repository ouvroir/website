<script lang="ts">
	import type { Blog, Event, Resource, Project, Meeting } from '$lib/types';
	import { getRandomPattern } from '$lib/utils/random';
	import { extractContentFromHTML } from '$lib/utils/helpers';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let content: Blog | Event | Resource | Project | Meeting;
	export let addPattern = false;

	let extracts: string[], doc: string, h1: string, p: string;
	onMount(() => {
		const data = extractContentFromHTML(content.html, ['h1', 'p']);
		extracts = data.extracts;
		doc = data.doc;
		h1 = extracts[0];
		p = extracts[1];
	});
</script>

{#if browser}
	<header class="header-content">
		<!-- {#if addPattern}
			<div class={`header-ptrn ${getRandomPattern()} patterns-contrast-1 patterns-size-s`}></div>
		{/if} -->
		<div class="title-container">
			<h1>{@html h1}</h1>
		</div>
		<!-- {#if content.meta.kind !== 'meeting'}
			<p class="frist-paragraph">{@html p}</p>
		{/if} -->
	</header>
{/if}
