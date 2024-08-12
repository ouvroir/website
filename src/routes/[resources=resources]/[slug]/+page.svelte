<script lang="ts">
	import { t, dateToLocalizedString } from '$lib/i18n/i18n.js';
	import Tree from '$lib/components/Tree.svelte';

	import { page } from '$app/stores';
	import { resources, screenType } from '$lib/stores';

	const content = $resources;
	const post = content.find((p) => p.meta.slug === $page.params.slug)!;

	const smallScreen = $screenType === 'mobile' || $screenType === 'tablet-vertical';
</script>

<aside class="aside-blog">
	<p class="project-description">{post.meta.description}</p>
	<div>
		<div class="meta">
			<span class="attr">{$t('resources.dateCreated')}</span>
			<p>{$dateToLocalizedString(post.meta.dateCreated)}</p>
		</div>
		<div class="meta">
			<span class="attr">{$t('resources.dateUpdated')}</span>
			<p>{$dateToLocalizedString(post.meta.dateUpdated)}</p>
		</div>
		<div class="meta">
			<span class="attr">{$t('resources.contributors')}</span>
			<ul>
				{#each post.meta.contributors as c}
					<li>{c}</li>
				{/each}
			</ul>
		</div>
	</div>

	<div class="tree-container">
		<Tree />
	</div>
</aside>

<article>
	<header>
		<h1>
			{post.meta.title}
		</h1>
	</header>
	<div class="text-body">
		{@html post.html}
	</div>
</article>

<style>
	article,
	header {
		display: contents;
	}
	.text-body {
		grid-column: 3/7;
		grid-row: 2/5;
		font-size: 1.1rem;
		/* padding-right: 1rem; */
	}

	h1 {
		grid-column: 3/-1;
		grid-row: 1;
		font-size: 2.5rem;
		padding-bottom: 4rem;
		line-height: 3rem;
	}

	.aside-blog {
		grid-row: 2/6;
		grid-column: 1/3;
		max-width: 90%;
	}

	.project-description {
		grid-column: 1/3;
		margin-bottom: 2rem;
		/* max-height: fit-content; */
		grid-row: 2;
		font-size: 0.9rem;
	}

	.meta {
		font-size: 0.9rem;
	}

	.meta + .meta {
		margin-top: 1rem;
	}

	.meta > p,
	.meta > ul {
		color: var(--clr-accent);
	}

	.meta > span {
		display: block;
		line-height: 1.2rem;
		margin-bottom: 0.5rem;
	}

	.meta > ul {
		margin-left: 1rem;
		& > li + li {
			margin-top: 0.7rem;
		}
	}

	.tree-container {
		position: sticky;
		margin-top: 2rem;
		height: fit-content;
		top: 6rem;
		content: '';
	}

	/** Mobile */
	@media screen and (max-width: 820px) {
		header {
			display: block;
			grid-column: 1/-1;
		}

		h1 {
			margin-top: 1rem;
			padding-bottom: 3rem;
		}

		.text-body {
			grid-column: 1/-1;
			grid-row: 3;
		}
	}

	@media screen and (min-width: 481px) and (max-width: 820px) {
		.text-body,
		.project-description {
			width: 85%;
		}
	}
</style>
