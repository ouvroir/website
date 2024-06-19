<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	export let meta;
	let pageMode: boolean;

	page.subscribe((p) => {
		if (p.params.members) pageMode = true;
	});
</script>

{#if meta}
	<ul class="meta-list">
		<div class="meta">
			<span>mail</span>
			{#if meta.mail}
				<a rel="external" href={`mailto:${meta.mail}`}>{meta.mail}</a>
			{/if}
		</div>
		{#if meta.permalink && pageMode}
			<div class="meta">
				<span>permalink</span>
				<a rel="external" href={`https://ouvroir.umontreal.ca${$page.url.pathname}`}
					>https://ouvroir.umontreal.ca{$page.url.pathname}</a
				>
			</div>
		{/if}
		{#if meta.projects && meta.projects.length > 0}
			<div class="meta">
				<span>projets</span>
				<ul>
					{#each meta.projects as p}
						<li>{p}</li>
					{/each}
				</ul>
			</div>
		{/if}
		{#if meta.tags && meta.tags.length > 0 && pageMode}
			<div class="meta">
				<span>tags</span>
				<ul>
					{#each meta.tags as tag}
						<li>{tag}</li>
					{/each}
				</ul>
			</div>
		{/if}
	</ul>
{/if}

<style>
	a {
		color: black;
	}
	.meta-list {
		flex-grow: 1;
		margin-top: 1.5rem;
	}
	.meta-list > * + * {
		margin-top: 0.7rem;
	}

	.meta {
		display: flex;
		flex-direction: row;
		font-size: 0.9rem;
		align-items: baseline;
		gap: 1rem;
		filter: opacity(0.8);
	}
	.meta > span {
		display: block;
		font-family: var(--ff-mono);
		color: var(--clr-accent);
		font-weight: 300;
		font-size: 0.85rem;
	}

	.meta > ul {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.6rem;
	}

	.meta > ul > li {
		width: fit-content;
	}

	.meta > ul > li:not(:last-child)::after {
		content: ', ';
	}
</style>
