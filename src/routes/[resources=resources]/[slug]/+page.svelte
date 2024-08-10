<script lang="ts">
	import { t, dateToLocalizedString, locale } from '$lib/i18n/i18n.js';
	import Tree from '$lib/components/Tree.svelte';

	import { page } from '$app/stores';
	import { resources, screenType } from '$lib/stores';

	const content = $resources;
	const post = content.find((p) => p.meta.slug === $page.params.slug);

	const smallScreen = $screenType === 'mobile' || $screenType === 'tablet-vertical';
</script>

<aside class="aside-blog">
	<div class="meta">
		<div>
			<span class="author">{post?.meta.author}</span> |
			<span>{$dateToLocalizedString(post.meta.creationDate)}</span>
		</div>
		<p class="project-description">{post.meta.description}</p>
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

	.aside-event {
		position: sticky;
		height: fit-content;
		top: 12rem;
		bottom: 8rem;
		grid-row: 2;
		grid-column: span 2;
		/* padding-top: 1.5rem; */
		width: 90%;
		border-top: solid 0.5px rgba(255, 68, 0, 0.461);
	}

	.aside-event > * + * {
		margin-top: 1.5rem;
	}

	.meta-left > .date {
		color: var(--clr-accent);
		font-size: 1rem;
		font-weight: 300;
		margin-bottom: 0.5rem;
		margin-top: 1.5rem;
	}
	.meta-left .label {
		display: block;
		font-weight: 500;
		margin-bottom: 0.5rem;
	}

	.meta-left .description {
		line-height: 1.2rem;
		font-weight: 300;
	}

	.participants-ul {
		display: flex;
		flex-direction: row;
		column-gap: 0.5rem;
		row-gap: 0.2rem;
		flex-wrap: wrap;
	}
	.participant {
		font-weight: 300;
		min-width: max-content;
	}

	.aside-event a {
		color: var(--clr-accent);
	}
	.aside-event a:hover {
		text-decoration: underline var(--clr-accent);
	}

	.author {
		color: var(--clr-accent);
		line-height: var(--body-line-height);
	}

	.project-description {
		grid-column: 1/3;
		/* max-height: fit-content; */
		grid-row: 2;
		font-size: 0.9rem;
	}

	.news-tree-container {
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
