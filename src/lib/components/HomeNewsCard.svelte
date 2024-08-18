<script lang="ts">
	import type { Blog, Event, Resource } from '$lib/types';
	import { getDateFromContent } from '$lib/utils/helpers';
	import { dateToLocalizedString } from '$lib/i18n/i18n';

	export let href = '';
	export let content: Blog | Event | Resource;

	let date: string, dateLabel: string;

	switch (content.meta.kind) {
		case 'blog':
			date = $dateToLocalizedString(content.meta.date);
			dateLabel = 'Publié le';
			break;
		case 'event':
			date = $dateToLocalizedString(content.meta.dateStart);
			dateLabel = 'À venir, le';
			break;
		case 'resource':
			date = $dateToLocalizedString(content.meta.dateCreated);
			dateLabel = 'Mise à jour le';
			break;
		default:
			date = '';
	}

	let authors = '';
	if (content.meta.kind === 'resource') {
		authors = content.meta.contributors.join(', ');
	} else {
		authors = content.meta.author;
	}
	authors = authors ? authors : 'Ouvroir';
</script>

<li class="home-news-item">
	<article>
		<header>
			<span class="document-kind">{content.meta.kind}</span>
			<h1><a {href}>{content.meta.title}</a></h1>
		</header>

		<div class="article-content">
			<div class="meta">
				<div class="meta-date">
					<p class="date">{dateLabel} {date}</p>
				</div>
				<span>|</span>
				<div>
					<p class="author">{authors}</p>
				</div>
			</div>
			<p class="description">{content.meta.description}</p>
		</div>
	</article>
</li>

<style>
	li {
		background-color: var(--clr-b);
		padding: 1.5rem 2rem;
		border-radius: var(--border-radius);
		box-shadow: 10px 10px 3rem hsl(94, 15%, 25%);
		color: var(--clr-a);
	}

	header {
		display: flex;
		flex-direction: column;
		gap: 0.05rem;
		margin-bottom: 1.4rem;
	}

	h1 {
		font-size: var(--fs-400);
		line-height: 2rem;
		font-weight: 300;

		& a {
			text-decoration: none;
			color: var(--clr-a);
		}
	}

	.article-content > * + * {
		margin-top: 0.5rem;
	}

	.meta {
		display: flex;
		flex-direction: row;
		gap: 0.3rem;
		font-weight: 600;
	}
	.meta-date {
		display: flex;
		flex-direction: row;
	}

	.description {
		font-size: var(--fs-200);
		font-weight: 400;
		line-height: 1.5rem;
	}
</style>
