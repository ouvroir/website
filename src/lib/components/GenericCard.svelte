<script lang="ts">
	import type { Blog, Event, Resource, Project } from '$lib/types';
	import { dateToLocalizedString, t } from '$lib/i18n/i18n';

	export let content: Blog | Event | Resource | Project;
	export let contrast = false;

	let date: string, dateLabel: string;

	switch (content.meta.kind) {
		case 'blog':
			date = $dateToLocalizedString(content.meta.date);
			dateLabel = $t('card.publishedOn');
			break;
		case 'event':
			date = $dateToLocalizedString(content.meta.dateStart);
			dateLabel = $t('card.happeningOn');
			break;
		case 'resource':
			date = $dateToLocalizedString(content.meta.dateCreated);
			dateLabel = $t('card.updatedOn');
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

<li class={`card-generic ${contrast ? 'contrast' : ''}`}>
	<span class="document-kind">{content.meta.kind}</span>
	<a href={`/projets/${content.meta.slug}`}>
		<h2>{content.meta.title}</h2>

		<div class="meta">
			<div class="meta-date">
				<p>{dateLabel} {date}</p>
			</div>
			<span>|</span>
			<div>
				<p class="author">{authors}</p>
			</div>
		</div>

		<p class="description">{content.meta.description}</p>
	</a>
</li>

<style>
	.card-generic {
		break-inside: avoid;
		border-radius: var(--border-radius);
		padding: 1.5rem 1rem;
		/* margin-bottom: 2rem; */
		transition: all 0.1s ease-in;

		& * {
			color: var(--clr-b);
			transition: color 0.1s ease-in;
		}

		& a > * + * {
			margin-top: 0.7rem;
		}
	}

	.card-generic:hover {
		/* box-shadow: 2px 2px 1.5rem var(--clr-b); */
		background-color: var(--clr-b);

		& * {
			color: var(--clr-a);
		}
	}

	a {
		text-decoration: none;
		cursor: pointer;
	}

	h2 {
		--fs: var(--fs-400);
		font-size: var(--fs);
		font-weight: 700;
		line-height: calc(var(--fs) * var(--lh-ratio-s));
		margin-bottom: 1rem;
	}

	.description {
		--fs: var(--fs-300);
		font-size: var(--fs);
		line-height: calc(var(--fs) * var(--lh-ratio-s));
		font-weight: 400;
	}

	.meta {
		display: flex;
		flex-direction: row;
		gap: 0.3rem;
	}
	.meta-date {
		display: flex;
		flex-direction: row;
		font-size: var(--fs-200);
		font-weight: 700;
	}
</style>
