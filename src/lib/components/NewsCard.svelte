<script lang="ts">
	import { t } from '$i18n/i18n';

	export let post;

	// If description is too short, decrease height of card
	const smallerCard = () => {
		if (!post.meta.description) return '';
		if (post.meta.description.length < 100) return 'smaller-card';
		else return '';
	};

	// If title is too long, decrease font size
	const smallerTitle = () => {
		if (type === 'blog' || type === 'event')
			if (post.meta.title.length > 50) return 'smaller-title';
			else return '';
	};

	$: type = post.meta.type as 'blog' | 'event' | 'meeting';
</script>

<li>
	<a href={`${$t('route.news')}/${post.meta.slug}`} class={`post-card `}>
		<span class="document-tag">{$t(`card.${post.meta.type}`)}</span>
		<h1 class={`${smallerTitle()}`}>
			<a href={`${$t('route.news')}/${post.meta.slug}`}>
				{#if type === 'meeting'}
					{post.meta.date.split('T')[0]}
				{:else}
					{post.meta.title}
				{/if}
			</a>
		</h1>
		<div class="post-card-main">
			{#if type === 'blog'}
				<div>
					<span class="author">{post.meta.author}</span> |
					<span>{post.meta.date.split('T')[0]}</span>
				</div>
			{:else if type === 'event'}
				<div>
					<span class="date">{post.meta.dateStart.split('T')[0]}</span>
					<div class="time-place">
						<span class="time">
							{post.meta.timeStart} - {post.meta.timeEnd}
						</span>
						|
						<span class="place">@ {post.meta.place}</span>
					</div>
				</div>
			{/if}
			<p class="description">{post.meta.description}</p>
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
	.post-card {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		cursor: pointer;
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

	.post-card:hover > h1 {
		text-decoration-color: orangered;
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
		padding-bottom: 1rem;
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
		margin-top: auto;
		/* flex-wrap: wrap; */
		gap: 1rem;
		font-weight: 300;
		font-size: 0.9rem;
		padding-top: 0.5rem;
		border-top: solid 0.5px rgba(0, 0, 0, 0.2);
	}

	.post-card {
		width: 19rem;
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
		color: orangered;
	}

	.date {
		display: block;
		color: orangered;
		margin-bottom: 0.5rem;
	}

	.time-place {
		display: block;
		/* margin-bottom: 0.7rem; */
	}

	.speaker {
		position: relative;
		/* color: orangered; */
		font-size: 0.9rem;
		font-weight: 300;
		display: block;
		margin-bottom: 0;
		top: 0.5rem;
	}
	.speaker + ul {
		color: orangered;
	}

	.underline {
		text-decoration-color: rgba(255, 68, 0, 0.847);
	}
</style>
