<script lang="ts">
	import { t, dateToLocalizedString } from '$i18n/i18n';

	export let post;

	const maxDescriptionLen = 150;

	// If title is too long, decrease font size
	const smallerTitle = () => {
		if (post.meta.kind === 'meeting') return '';
		if (post.meta.title.length > 50) return 'smaller-title';
		else return '';
	};

	$: kind = post.meta.kind as 'blog' | 'event' | 'meeting';
	// $: post.meta.slug ? null : encodeURIComponent
</script>

<li class="post-card-container">
	<a
		href={`${$t('route.news')}/${$t(`news.type.${post.meta.kind}`)}/${post.meta.slug}`}
		class={`post-card`}
	>
		<span class="document-tag">{$t(`card.${post.meta.kind}`)}</span>
		<h1 class={`${smallerTitle()}`}>
			{#if kind === 'meeting'}
				{$dateToLocalizedString(post.meta.date.split('T')[0])}
			{:else}
				{post.meta.title}
			{/if}
		</h1>
		<div class="post-card-main">
			{#if kind === 'blog'}
				<div>
					<span class="author">{post.meta.author}</span> |
					<span>{$dateToLocalizedString(post.meta.date.split('T')[0])}</span>
				</div>
			{:else if kind === 'event'}
				<div>
					<span class="date">{$dateToLocalizedString(post.meta.dateStart.split('T')[0])}</span>
					<div class="time-place">
						<span class="time">
							{post.meta.timeStart} - {post.meta.timeEnd}
						</span>
						|
						<span class="place">@ {post.meta.place}</span>
					</div>
				</div>
			{/if}
			<p class="description">
				{#if post.meta.description}
					{post.meta.description.length > maxDescriptionLen
						? post.meta.description.slice(0, maxDescriptionLen) + '...'
						: post.meta.description}
				{:else}
					...
				{/if}
			</p>
		</div>
		{#if post.meta.tags && post.meta.tags.length}
			<ul class="tags">
				{#each post.meta.tags as t}
					<li id={t}>{t}</li>
				{/each}
			</ul>
		{:else if post.meta.participants && post.meta.participants.length > 0}
			<span class="speaker">{$t('card.speaker')}</span>
			<ul class="tags">
				{#each post.meta.participants as t}
					<li id={t}>{t}</li>
				{/each}
			</ul>
		{/if}
	</a>
</li>

<style>
	.post-card-container  {
		width: 10rem;
	}
	.post-card {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		cursor: pointer;
		width: 100% !important;
	}
	.post-card:hover:after {
		content: '';
		position: absolute;
		top: -5%;
		left: -5%;
		width: 110%;
		height: 110%;
		background-color: rgba(0, 0, 0, 0.03);
		z-index: -1;
	}
	.post-card > * {
		min-height: max-content;
	}

	.post-card:hover > h1 {
		text-decoration-color: var(--clr-accent);
	}

	.post-card > * {
		height: max-content;
	}

	.smaller-card > ul {
		margin-top: 0.5rem;
	}

	.post-card-main {
		/* border-top: solid 0.5px rgba(0, 0, 0, 0.2); */
		/* padding: 1rem 0; */
		height: max-content;
		margin-bottom: auto;
	}
	.post-card-main > * + * {
		margin-top: 0.4rem;
	}

	.description {
		line-height: 1.4rem;
		font-weight: 300;
	}

	.tags {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		column-gap: 0.7rem;
		row-gap: 0.5rem;
		font-weight: 300;
		font-size: 0.9rem;
		padding-top: 0.5rem;
		border-top: solid 0.5px rgba(0, 0, 0, 0.2);
		font-size: 0.8rem;
	}

	h1 {
		font-size: 2rem;
		text-decoration: underline;
		text-decoration-thickness: 0.25rem;
		text-decoration-color: transparent;
		transition: all ease 400ms;
	}

	.smaller-title {
		font-size: 1.2rem;
		line-height: 1.5rem;
	}

	.author {
		color: var(--clr-accent);
	}

	.date {
		display: block;
		color: var(--clr-accent);
		margin-bottom: 0.5rem;
	}

	.time-place {
		display: block;
		/* margin-bottom: 0.7rem; */
	}

	.speaker {
		position: relative;
		font-size: 0.9rem;
		font-weight: 300;
		display: block;
		margin-bottom: 0;
		top: 1.3rem;
	}
	.speaker + ul {
		color: var(--clr-accent);
	}

	.underline {
		text-decoration-color: rgba(255, 68, 0, 0.847);
	}

	@media screen and (max-width: 850px) {
		.post-card-main {
			padding-bottom: 0;
		}
	}
</style>
