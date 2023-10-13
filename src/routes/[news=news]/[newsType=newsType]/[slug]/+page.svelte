<script lang="ts">
	import { t, dateToLocalizedString } from '$lib/i18n/i18n.js';
	import { screenType } from '$lib/stores.js';
	import { localize } from '$lib/i18n/i18n.js';
	import Tree from '$lib/components/Tree.svelte';

	export let data;

	$: post = $localize(data.post)[0];

	const smallScreen = $screenType === 'mobile' || $screenType === 'tablet-vertical';
</script>

{#if post && post.meta.type === 'blog' && !smallScreen}
	<Tree />
{/if}

{#if post && post.meta.type === 'blog'}
	<aside class="aside-blog">
		<div class="meta">
			<div>
				<span class="author">{post?.meta.author}</span> |
				<span>{$dateToLocalizedString(post?.meta.date.split('T')[0])}</span>
			</div>
			<p class="project-description">{post?.meta.description}</p>
		</div>
	</aside>
{/if}

{#if post && post.meta.type === 'event' && !smallScreen}
	<aside class="aside-event">
		<div class="meta-left">
			<p class="date">
				{$dateToLocalizedString(post.meta.dateStart.split('T')[0])}
			</p>
			<p class="time-place">{post.meta.timeStart} - {post.meta.timeEnd} @ {post.meta.place}</p>
		</div>
		<div class="meta-left">
			<span class="label">{$t('news.summary')}</span>
			<p class="description">{post?.meta.description}</p>
		</div>
		<div class="meta-left">
			<span class="label">{$t('news.speaker')}</span>
			{#if Array.isArray(post.meta.participants)}
				<ul class="participants-ul">
					{#each post?.meta.participants as p, i}
						<li class="participant">{p}{i === post.meta.participants.length - 1 ? '' : ', '}</li>
					{/each}
				</ul>
			{:else}
				<p class="participant">{post?.meta.participants.join(',')}</p>
			{/if}
		</div>
		<div class="meta-left">
			<a class="register" href={post?.meta.link}>{$t('news.register')}</a>
		</div>
	</aside>
{/if}

<article>
	<header>
		<h1>
			{#if post && post.meta.type === 'meeting'}
				{post?.meta.date.split('T')[0]}
			{:else}
				{post?.meta.title}
			{/if}
		</h1>
	</header>
	<div class="text-body">
		{@html post?.html}
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
	}

	.aside-blog {
		grid-row: 2;
		grid-column: 1/3;
		max-width: 90%;
		margin-bottom: 3rem;
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
