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
	<header>
		{#if addPattern}
			<div class={`header-ptrn ${getRandomPattern()} patterns-contrast-1 patterns-size-s`}></div>
		{/if}
		<div class="title-container">
			<h1>{@html h1}</h1>
		</div>
		{#if content.meta.kind !== 'meeting'}
			<p class="frist-paragraph">{@html p}</p>
		{/if}
	</header>
{/if}

<style>
	header {
		--margin-btm: 2rem;
		grid-column: full;
		display: grid;
		grid-template-columns: subgrid;
		/* gap: 2rem; */
		margin-bottom: var(--margin-btm);
		margin-top: calc(var(--nav-height) * -1);
		padding: var(--margin-btm) 0;
		padding-top: calc(var(--nav-height) + var(--content-top-padding));
		z-index: 2;

		/* border-bottom-left-radius: var(--border-radius);
		border-bottom-right-radius: var(--border-radius);
		box-shadow: 2px 2px 1rem -3px var(--clr-b); */

		& .title-container {
			grid-column: 3/-3;
		}

		& h1,
		& .frist-paragraph {
			border: solid 0.5rem var(--cb);
		}

		& h1 {
			color: var(--clr-b);
			font-size: var(--fs-700);
			line-height: 3.5rem;
			font-weight: 700;
			text-wrap: balance;
			width: 80%;
		}

		& .frist-paragraph {
			margin-top: 1rem;
			font-weight: 500;
			font-size: var(--fs-300);
			line-height: var(--body-line-height);
			grid-column: content-start / popout-end;
		}

		& h1,
		& .frist-paragraph {
			--padding-v: 1rem;
			background-color: var(--ca);
			position: relative;
			left: calc(var(--padding-v) * -1);
			padding: 0.7rem var(--padding-v);
			color: var(--cb);
		}

		& .header-ptrn {
			grid-column: full;
			grid-row: 1;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 35%;
			z-index: -1;
		}
	}
</style>
