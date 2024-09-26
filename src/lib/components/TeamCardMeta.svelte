<script lang="ts">
	import { page } from '$app/stores';
	import { t } from '$i18n/i18n';

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
						<li><a href={`${$t('route.projects')}/${p}`}>{p}</a></li>
					{/each}
				</ul>
			</div>
		{/if}
		{#if meta.tags && meta.tags.length > 0 && pageMode}
			<div class="meta">
				<span>tags</span>
				<ul>
					{#each meta.tags as tag}
						<li>
							<a href={`${$t('route.project')}/${tag}`}>{tag}</a>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</ul>
{/if}

<style>
	.meta-list {
		list-style: none;
		margin: 0;
		padding: 0;
		margin-top: 1.5rem;
	}
	.meta-list > * + * {
		margin-top: 1rem;
	}

	.meta {
		display: flex;
		flex-direction: row;
		font-size: var(--fs-300);
		align-items: baseline;
		gap: 1rem;
		filter: opacity(0.8);
	}
	.meta > span {
		display: block;
		font-weight: 600;
		text-transform: uppercase;
		font-size: var(--fs-200);
	}

	.meta > ul {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		column-gap: 0.6rem;
		margin: 0;
		padding: 0;
	}

	.meta > ul > li {
		width: fit-content;
		max-height: fit-content;
		list-style: none;
		margin-top: 0;
	}

	.meta > ul > li:not(:last-child)::after {
		content: ', ';
	}
</style>
